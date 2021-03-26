package wier23.callable;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogType;
import org.springframework.dao.DataIntegrityViolationException;

import wier23.Utils;
import wier23.dtos.RobotsTxt;
import wier23.entity.DataType;
import wier23.entity.Image;
import wier23.entity.Link;
import wier23.entity.Page;
import wier23.entity.PageData;
import wier23.entity.PageType;
import wier23.entity.Site;
import wier23.service.FrontierService;
import wier23.service.LinkService;
import wier23.service.PageService;
import wier23.service.SiteService;

public class PageCrawl implements Callable<PageCrawl>
{
    private final Logger logger = Logger.getLogger(PageCrawl.class.getName());

    private final FrontierService frontierService;
    private final PageService pageService;
    private final SiteService siteService;
    private final LinkService linkService;

    private final ChromeDriver chromeDriver;

    private final Page page;
    private final HashMap<String, Page> newPagesHashMap;

    public PageCrawl(Page page, ChromeDriver chromeDriver, FrontierService frontierService, PageService pageService, SiteService siteService, LinkService linkService)
    {
        this.newPagesHashMap = new HashMap<>();
        this.frontierService = frontierService;
        this.pageService = pageService;
        this.siteService = siteService;
        this.linkService = linkService;
        this.chromeDriver = chromeDriver;
        this.page = page;
    }
    @Override
    public PageCrawl call()
    {
        try
        {
            // Get site if it already exists, otherwise create new one
            String domain = Utils.getDomainFromUrl(page.getUrl());
            Site site = getOrCreateSite(domain);

            if (site.getRobotsContent() != null && !site.getRobotsContent().isEmpty())
            {
                RobotsTxt robotsTxt = Utils.parseRobotsTxt(site.getRobotsContent());
                // TODO check robots rules and return this if we're not allowed to visit the site
            }

            page.setAccessedTime(LocalDateTime.now());
            page.setSite(site);

            frontierService.makeRequest(page.getUrl(), page.getSite(), chromeDriver);
            LogEntries logEntries = chromeDriver.manage().logs().get(LogType.PERFORMANCE);

            // Set status code
            Integer statusCode = getStatusCode(logEntries);
            logger.info(page.getUrl() + " " + statusCode);
            page.setHttpStatusCode(statusCode);

            // Set content hash
            String body = chromeDriver.findElementByTagName("body").getText();
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(body.getBytes());
            byte[] contentHash = messageDigest.digest();

            // Check for duplicates by content hash
            pageService.findByContentHash(contentHash).ifPresentOrElse(this::saveDuplicatePage, () -> {
                // If not duplicate, crawl for links and save
                extractUrlsByATag();
                extractImages(logEntries);
                extractUrlsByOnClickElements();

                page.setPageType(PageType.HTML);
                page.setHtmlContent(body);
                page.setContentHash(contentHash);

                pageService.savePage(page);
            });

        } catch (URISyntaxException e) {
            // This can happen when parsing domain name
            logger.warning(e.getMessage());

        } catch (WebDriverException e)
        {
            // Invalid page
            logger.warning(e.getMessage());
            logger.warning("Removing page from database.");

            linkService.deleteLinkByPageId(page.getId());
            pageService.deletePage(page);

        } catch (DataIntegrityViolationException e)
        {
            // Page with this content hash already exists
            // This can happen because of multithreading
            // Save as duplicate

            logger.warning("Tried to save page with existing content hash. Saving as duplicate instead.");
            pageService.findByContentHash(page.getContentHash()).ifPresentOrElse(this::saveDuplicatePage, () -> {
                // If page with such content hash does not yet exist, rethrow the exception
                throw e;
            });

        } catch (NoSuchAlgorithmException e) {
            // This should never happen
            logger.severe(e.getMessage());
        }

        return this;
    }

    private void saveDuplicatePage(Page originalPage)
    {
        Link link = new Link();
        link.setPageFrom(page);
        link.setPageTo(originalPage);

        page.setPageType(PageType.DUPLICATE);
        page.setContentHash(null);
        page.setHtmlContent(null);

        pageService.savePage(page);
        linkService.saveLink(link);
    }

    private Site getOrCreateSite(String domain)
    {
        return siteService.findByDomain(domain)
                .orElseGet(() -> {
                    Site newSite = new Site();
                    newSite.setDomain(domain);

                    try
                    {
                        frontierService.makeRequest("http://" + domain + "/robots.txt", newSite, chromeDriver);
                        if (!chromeDriver.getTitle().contains("404") && !chromeDriver.findElementByTagName("body").getText().contains("404"))
                        {
                            newSite.setRobotsContent(chromeDriver.findElementByTagName("body").getText());
                            Optional.ofNullable(Utils.parseRobotsTxt(newSite.getRobotsContent()))
                                    .ifPresent(robotsTxt -> {
                                        if (robotsTxt.getCrawlDelay() > 0) {
                                            newSite.setDomainDelay(robotsTxt.getCrawlDelay());
                                        }
                                    });
                        }

                    }
                    catch (WebDriverException e)
                    {
                        // domain doesn't have robots.txt, so leave it as null
                    }
                    return siteService.saveSite(newSite);
                });
    }

    private void extractImages(LogEntries logEntries)
    {
        List<Image> images = logEntries.getAll().stream()
                .map(logEntry -> new JSONObject(logEntry.getMessage()))
                .map(jsonObject -> jsonObject.getJSONObject("message"))
                .filter(jsonObject -> jsonObject.getString("method").equals("Network.responseReceived"))
                .map(jsonObject -> jsonObject.getJSONObject("params").getJSONObject("response"))
                .filter(jsonObject -> jsonObject.getJSONObject("headers").has("Content-Type"))
                .filter(jsonObject -> jsonObject.getJSONObject("headers").getString("Content-Type").startsWith("image"))
                .filter(jsonObject -> jsonObject.getString("url").length() < 255)
                .map(jsonObject -> {
                    Image image = new Image();
                    image.setAccessedTime(LocalDateTime.now());
                    image.setContentType(jsonObject.getJSONObject("headers").getString("Content-Type"));
                    image.setFilename(jsonObject.getString("url"));
                    image.setPage(page);
                    return image;
                })
                .collect(Collectors.toList());

        page.setImages(images);
    }

    private void extractUrlsByOnClickElements()
    {
        List<WebElement> onclickElements = chromeDriver.findElementsByXPath("//*[@onclick]");
        for(WebElement onclickEl : onclickElements)
        {
            String onclickAttr = onclickEl.getAttribute("onclick");
            if(onclickAttr.startsWith("location.href"))
            {
                String pth = onclickAttr.substring(14);

//                logger.info(onclickAttr);
            }
            else if(onclickAttr.startsWith("document.location"))
            {
//                logger.info(onclickAttr);
            }
        }
    }

    private void extractUrlsByATag()
    {
        try {

            chromeDriver.findElementsByTagName("a").forEach(tag -> {
                String url = tag.getAttribute("href");
                if (url != null)
                {
                    if (url.startsWith("/"))
                    {
                        url = page.getUrl() + url;
                    }

                    int beginIndex = url.lastIndexOf(".");
                    if (beginIndex != -1) {
                        String dataType = url.substring(beginIndex).toUpperCase();
                        if (DataType.allDataTypes.contains(dataType))
                        {
                            PageData pageData = new PageData();
                            pageData.setDataType(new DataType(dataType));
                            pageData.setPage(page);
                        }
                        else
                        {
                            checkAndAddToList(url);
                        }
                    } else {
                        checkAndAddToList(url);
                    }
                }
            });

        }
        catch (WebDriverException e) {
            logger.warning(e.getMessage());
        }
    }

    /**
     * This method gets url, converts it to a canonical url and adds it to the url list
     * @param url
     */
    private void checkAndAddToList(String url)
    {
        String canonicalUrl;
        try
        {
            canonicalUrl = Utils.createCanonicalUrl(url);
        }
        catch (Exception e)
        {
//            logger.warning(url + " " + e.getMessage());
            return;
        }

        if (newPagesHashMap.containsKey(canonicalUrl)) {
            Link link = new Link();
            link.setPageFrom(page);

            Page pageTo = newPagesHashMap.get(canonicalUrl);
            link.setPageTo(pageTo);

            linkService.saveLink(link);

            return;
        }

        pageService.findByUrl(canonicalUrl)
                .ifPresentOrElse(
                        pageTo -> {
                            Link link = new Link();
                            link.setPageFrom(page);

                            link.setPageTo(pageTo);

                            linkService.saveLink(link);
                        },
                        () -> {
                            Page pageTo = new Page();
                            pageTo.setUrl(canonicalUrl);
                            pageTo.setPageType(PageType.FRONTIER);

                            Link link = new Link();
                            link.setPageFrom(page);
                            link.setPageTo(pageTo);


                            newPagesHashMap.put(canonicalUrl, pageTo);

                            pageTo = pageService.savePage(pageTo);
                            linkService.saveLink(link);

                            frontierService.addToFrontier(pageTo);
                        }
                );
    }

    public int getStatusCode(LogEntries logEntries) {

        return logEntries.getAll().stream()
                .map(logEntry -> new JSONObject(logEntry.getMessage()))
                .map(jsonObject -> jsonObject.getJSONObject("message"))
                .filter(jsonObject -> jsonObject.getString("method").equals("Network.responseReceived"))
                .map(jsonObject -> jsonObject.getJSONObject("params").getJSONObject("response"))
                .filter(jsonObject -> jsonObject.getString("url").equals(page.getUrl()))
                .map(jsonObject -> jsonObject.getInt("status"))
                .findAny()
                .orElseGet(() -> {
                    try
                    {
                        Thread.sleep(frontierService.getDomainLeftDelayInMillis(page.getSite()));
                        frontierService.updateDomainTime(page.getSite().getDomain());
                        return Jsoup.connect(page.getUrl()).execute().statusCode();
                    }
                    catch (IOException | InterruptedException e)
                    {
                        logger.warning(e.getMessage());
                    }
                    return 400;
                });
    }

    /**
     * This method returns crawler's chrome driver so it can be reused.
     * @return chrome driver
     */
    public ChromeDriver getChromeDriver()
    {
        return chromeDriver;
    }
}

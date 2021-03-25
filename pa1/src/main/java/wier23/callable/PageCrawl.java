package wier23.callable;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.dao.DataIntegrityViolationException;

import wier23.Utils;
import wier23.dtos.RobotsTxt;
import wier23.entity.ContentHash;
import wier23.entity.Link;
import wier23.entity.Page;
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
    private final List<Link> linksList;

    public PageCrawl(Page page, ChromeDriver chromeDriver, FrontierService frontierService, PageService pageService, SiteService siteService, LinkService linkService)
    {
        this.newPagesHashMap = new HashMap<>();
        this.linksList = new LinkedList<>();
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
        /*
         * First we check the domain if there are any restrictions for page accessing
         */

        String domain = Utils.getDomainFromUrl(page.getUrl());

        Site site = getOrCreateSite(domain);

        RobotsTxt robotsTxt;
        if(site.getRobotsContent() != null && !site.getRobotsContent().isEmpty())
        {
            robotsTxt = Utils.parseRobotsTxt(site.getRobotsContent());
//            logger.info(robotsTxt.toString());
        }
        String body;
        try {
            page.setAccessedTime(LocalDateTime.now());
            page.setSite(site);

            frontierService.makeRequest(page.getUrl(), page.getSite(), chromeDriver);

            Integer statusCode = Utils.getStatusCode(chromeDriver, page, frontierService);
            logger.info(page.getUrl() + " " + statusCode);
            page.setHttpStatusCode(statusCode);

            body = chromeDriver.findElementByTagName("body").getText();

            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(body.getBytes());

            ContentHash contentHash = new ContentHash();
            contentHash.setHash(messageDigest.digest());

            Optional<Page> originalPage = pageService.findByContentHash(contentHash);
            if (originalPage.isPresent()) {
                saveDuplicatePage(originalPage.get());
                return this;
            }
            else {
                page.setPageType(PageType.HTML);
                page.setHtmlContent(body);
                page.setContentHash(contentHash);
            }

        } catch (WebDriverException e) {
            logger.warning(e.getMessage());
            logger.warning("Removing page from database.");

            linkService.deleteLinkByPageId(page.getId());
            pageService.deletePage(page);

            return this;
        } catch (NoSuchAlgorithmException e) {
            // This should never happen
            logger.severe(e.getMessage());
        }



        extractUrlsByATag();

//        extractUrlsByOnClickElements();
//
//        extractUrlsByImgTags();

        try {
            pageService.savePage(page);
            linkService.saveAllLinks(linksList);
        }
        catch (DataIntegrityViolationException e) {
            logger.warning("Duplicate content hash exception! Saving as duplicate instead.");
            pageService.findByContentHash(page.getContentHash())
                    .ifPresentOrElse(
                            this::saveDuplicatePage,
                            () -> {
                                throw new DataIntegrityViolationException("This content has does not yet exist!");
                    });
            return this;
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

    private void extractUrlsByImgTags()
    {
        List<WebElement> imgTags = chromeDriver.findElementsByTagName("img");
        for(WebElement imgTag : imgTags)
        {
            String imgLink = imgTag.getAttribute("src");
            try
            {
                if(imgLink.startsWith("/"))
                {
                    imgLink = page.getUrl() + imgLink;
                }
                // TODO add image to page data
            }
            catch (Exception e)
            {
                // ignore bad urls and base64 encoded images
            }
        }
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
                try
                {
                    if(url.startsWith("/"))
                    {
                        url = page.getUrl() + url;
                    }
                    checkAndAddToList(url);
                }
                catch (Exception e)
                {
                    // ignore bad urls
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

            linksList.add(link);

            return;
        }

        pageService.findByUrl(canonicalUrl)
                .ifPresentOrElse(
                        pageTo -> {
                            Link link = new Link();
                            link.setPageFrom(page);

                            link.setPageTo(pageTo);

                            linksList.add(link);
                        },
                        () -> {
                            Page pageTo = new Page();
                            pageTo.setUrl(canonicalUrl);
                            pageTo.setPageType(PageType.FRONTIER);

                            Link link = new Link();
                            link.setPageFrom(page);
                            link.setPageTo(pageTo);

                            linksList.add(link);

                            newPagesHashMap.put(canonicalUrl, pageTo);
                            frontierService.addToFrontier(pageTo);
                        }
                );
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

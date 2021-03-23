package wier23.callable;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import wier23.Utils;
import wier23.dtos.RobotsTxt;
import wier23.entity.Link;
import wier23.entity.Page;
import wier23.entity.Site;
import wier23.enums.PageType;
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
        logger.info("Visiting: " + page.getUrl());

        Site site = getOrCreateSite(domain);
        if(site.getRobotsContent() != null && !site.getRobotsContent().isEmpty())
        {
            RobotsTxt robotsTxt = Utils.parseRobotsTxt(site.getRobotsContent());
            // TODO check if link is allowed etc.
        }

//        logger.info("Access time: " + LocalDateTime.now());
        String body;
        try {
            chromeDriver.get(page.getUrl());
            body = chromeDriver.findElementByTagName("body").getText();
            page.setAccessedTime(LocalDateTime.now());
            page.setPageType(PageType.HTML);
            page.setSite(site);
            page.setHtmlContent(body);

            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(body.getBytes());

            page.setContentHash(messageDigest.digest());

        } catch (WebDriverException | NoSuchAlgorithmException e) {
            logger.warning(e.getMessage());
            logger.warning("Removing page from database.");

            pageService.deletePage(page);

            return this;
        }
        // TODO CHECK IF DUPLICATE

        extractUrlsByATag();

//        extractUrlsByOnClickElements();
//
//        extractUrlsByImgTags();

        pageService.savePage(page);

        pageService.saveAllPages(newPagesHashMap.values());

        linkService.saveAllLinks(linksList);

        return this;
    }

    private Site getOrCreateSite(String domain)
    {
        return siteService.findByDomain(domain)
                .orElseGet(() -> {
                    Site newSite = new Site();
                    try
                    {
                        chromeDriver.get("http://" + domain + "/robots.txt");

                        if (!chromeDriver.getTitle().contains("404") && !chromeDriver.findElementByTagName("body").getText().contains("404"))
                        {
                            newSite.setRobotsContent(chromeDriver.findElementByTagName("body").getText());
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
            link.setPageTo(newPagesHashMap.get(canonicalUrl));
            linksList.add(link);
            return;
        }

        pageService.findByUrl(canonicalUrl)
                .ifPresentOrElse(
                        existingPage -> {
                            Link link = new Link();
                            link.setPageFrom(page);
                            link.setPageTo(existingPage);
                            linksList.add(link);
                        },
                        () -> {
                            Page newPage = new Page();
                            newPage.setUrl(url);
                            newPage.setPageType(PageType.FRONTIER);

                            Link link = new Link();
                            link.setPageFrom(page);
                            link.setPageTo(newPage);

                            linksList.add(link);
                            newPagesHashMap.put(canonicalUrl, newPage);

                            frontierService.addToFrontier(newPage);
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

package wier23.callable;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import wier23.Utils;
import wier23.dtos.RobotsTxt;
import wier23.entity.Page;
import wier23.entity.Site;
import wier23.enums.PageType;
import wier23.service.FrontierService;
import wier23.service.PageService;
import wier23.service.SiteService;

public class PageCrawl implements Callable<PageCrawl>
{
    private final Logger logger = Logger.getLogger(PageCrawl.class.getName());

    private final FrontierService frontierService;
    private final PageService pageService;
    private final SiteService siteService;
    private final ChromeDriver chromeDriver;
    private final Page page;
    private List<String> urlList;
    private List<Page> linkList;

    public PageCrawl(Page page, ChromeDriver chromeDriver, FrontierService frontierService, PageService pageService, SiteService siteService)
    {
        this.urlList = new LinkedList<>();
        this.linkList = new LinkedList<>();
        this.frontierService = frontierService;
        this.pageService = pageService;
        this.siteService = siteService;
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
        logger.info("Začenjam: " + page.getUrl());
        Site site;
        if(siteService.findByDomain(domain).isPresent())
        {
            site = siteService.findByDomain(domain).get();
            if(site.getRobotsContent() != null && !site.getRobotsContent().isEmpty())
            {
                RobotsTxt robotsTxt = Utils.parseRobotsTxt(site.getRobotsContent());
                // TODO check if link is allowed etc.
            }
        }
        else
        {
            chromeDriver.get("http://" + domain + "/robots.txt");
            site = new Site();
            site.setDomain(domain);
            if(!chromeDriver.getTitle().contains("404") && !chromeDriver.findElementByTagName("body").getText().contains("404"))
            {
                site.setRobotsContent(chromeDriver.findElementByTagName("body").getText());
            }
        }



        logger.info("Visiting: " + page.getUrl());
        chromeDriver.get(page.getUrl());
        page.setAccessedTime(LocalDateTime.now());
        page.setPageType(PageType.HTML);
        logger.info("Access time: " + LocalDateTime.now());

        // TODO parse the page and add the urls to the frontier
        List<WebElement> aTags = chromeDriver.findElementsByTagName("a");
        for(WebElement tag : aTags)
        {
            String link = tag.getAttribute("href");
            try
            {
                if(link.startsWith("/"))
                {
                    link = page.getUrl() + link;
                }
                checkAndSaveLink(link);
            }
            catch (Exception e)
            {
                // ignore bad urls
            }
        }
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

        pageService.savePage(page);
        siteService.saveSite(site);
        frontierService.saveLinks(page, linkList);
        frontierService.saveToFrontier(page, urlList);

        return this;
    }

    /**
     * This method gets url, converts it to a canonical url and adds it to the url list
     * @param link
     */
    private void checkAndSaveLink(String link)
    {
        try
        {
            link = Utils.createCanonicalUrl(link);
        }
        catch (Exception e)
        {
            logger.warning(link + " " + e.getMessage());
        }

        String finalLink = link;
        frontierService
                .checkUrl(finalLink)
                .ifPresentOrElse(pageLink -> linkList.add(pageLink),
                        () -> urlList.add(finalLink));
    }

    /**
     * This method returns crawler's chrome driver so it can be reused.
     * @return chrome driver
     */
    public ChromeDriver getChromeDriver()
    {
        return chromeDriver;
    }

    /**
     * This method returns a list of pages with crawled links.
     * @return pagesList
     */
    public List<String> getUrlList()
    {
        return urlList;
    }

    /**
     * This method returns page we just crawled with some updated fields.
     * @return page
     */

    public Page getPage()
    {
        return page;
    }
}

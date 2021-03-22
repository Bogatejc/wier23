package wier23.callable;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import wier23.Utils;
import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.service.FrontierService;
import wier23.service.PageService;

public class PageCrawl implements Callable<PageCrawl>
{
    private final Logger logger = Logger.getLogger(PageCrawl.class.getName());

    private final PageService pageService;
    private final FrontierService frontierService;
    private final ChromeDriver chromeDriver;
    private final Page page;
    private List<String> urlList;
    private List<Page> linkList;

    public PageCrawl(Page page, ChromeDriver chromeDriver, FrontierService frontierService, PageService pageService)
    {
        this.urlList = new LinkedList<>();
        this.linkList = new LinkedList<>();
        this.pageService = pageService;
        this.frontierService = frontierService;
        this.chromeDriver = chromeDriver;
        this.page = page;
    }

    @Override
    public PageCrawl call()
    {
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
                if(link.startsWith("/")){
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
                if(imgLink.startsWith("/")){
                    imgLink = page.getUrl() + imgLink;
                }
//                page.getImages().add(new Image());
            }
            catch (Exception e)
            {
                // ignore bad urls and base64 encoded images
            }
        }

        pageService.savePage(page);
        frontierService.saveLinks(page, linkList);
        frontierService.saveToFrontier(page, urlList);

        return this;
    }

    /**
     *
     * @param link
     */
    private void checkAndSaveLink(String link) {
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

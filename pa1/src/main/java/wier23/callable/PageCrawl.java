package wier23.callable;

import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.openqa.selenium.chrome.ChromeDriver;

import wier23.entity.Page;

public class PageCrawl implements Callable<PageCrawl>
{
    private final Logger logger = Logger.getLogger(PageCrawl.class.getName());

    private final ChromeDriver chromeDriver;
    private final Page page;

    public PageCrawl(Page page, ChromeDriver chromeDriver) {
        this.chromeDriver = chromeDriver;
        this.page = page;
    }

    @Override
    public PageCrawl call()
    {
        logger.info("Visiting: " + page.getUrl());
        chromeDriver.get(page.getUrl());

        // TODO parse the page and add the urls to the frontier

        return this;
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

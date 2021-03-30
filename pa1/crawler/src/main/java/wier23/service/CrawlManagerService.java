package wier23.service;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PreDestroy;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.stereotype.Service;

import wier23.callable.PageCrawl;
import wier23.entity.Page;

@Service
public class CrawlManagerService
{
    private final Logger logger = Logger.getLogger(CrawlManagerService.class.getName());

    private final FrontierService frontierService;

    private final PageService pageService;

    private final SiteService siteService;

    private final LinkService linkService;

    private final Queue<ChromeDriver> driverQueue;

    private final ExecutorService executorService;

    private final Queue<Future<PageCrawl>> futureList;

    public CrawlManagerService(FrontierService frontierService, PageService pageService, SiteService siteService, LinkService linkService, int threadCount)
    {
        this.frontierService = frontierService;
        this.pageService = pageService;
        this.siteService = siteService;
        this.linkService = linkService;

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("user-agent=fri-wier-wier23");

        LoggingPreferences loggingPreferences = new LoggingPreferences();
        loggingPreferences.enable(LogType.PERFORMANCE, Level.ALL);
        options.setCapability("goog:loggingPrefs", loggingPreferences);

        executorService = Executors.newFixedThreadPool(threadCount);
        futureList = new ConcurrentLinkedQueue<>();

        driverQueue = new LinkedList<>();
        for (int i = 0; i < threadCount; i++) {
            ChromeDriver chromeDriver = new ChromeDriver(options);

            // Timeouts
            chromeDriver.manage()
                    .timeouts()
                    .implicitlyWait(30, TimeUnit.SECONDS)
                    .pageLoadTimeout(30, TimeUnit.SECONDS)
                    .setScriptTimeout(30, TimeUnit.SECONDS);

            driverQueue.add(chromeDriver);
        }

    }

    public void run()
    {
        // Run until frontier is empty and all crawlers have completed their job.
        while(!frontierService.isEmpty() || !futureList.isEmpty())
        {
            // Check if any crawlers have ended their job and save the data.
            if (!futureList.isEmpty())
            {
                Future<PageCrawl> polledFuture = futureList.poll();
                if (polledFuture.isDone())
                {
                    try
                    {
                        PageCrawl pageCrawl = polledFuture.get();
                        driverQueue.add(pageCrawl.getChromeDriver());
                    }
                    catch (InterruptedException | ExecutionException e)
                    {
                        logger.severe(e.getMessage());
                        e.printStackTrace();
                    }
                }
                else
                {
                    futureList.add(polledFuture);
                }
            }

            // Check if there is a free thread and create a new crawler
            if (!driverQueue.isEmpty())
            {
                Page page = frontierService.getNextPage();
                if (page != null)
                {
                    PageCrawl pageCrawl = new PageCrawl(page, driverQueue.poll(), frontierService, pageService, siteService, linkService);
                    Future<PageCrawl> future = executorService.submit(pageCrawl);
                    futureList.add(future);
                    try
                    {
                        Thread.sleep(250);
                    }
                    catch (InterruptedException e)
                    {
                        logger.severe(e.getMessage());
                    }
                }
            }
        }
    }

    @PreDestroy
    private void preDestroy() {
        driverQueue.forEach(RemoteWebDriver::close);
        driverQueue.forEach(RemoteWebDriver::quit);
    }
}

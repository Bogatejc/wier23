package wier23.service;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import wier23.callable.PageCrawl;
import wier23.entity.Page;

@Service
public class CrawlManagerService
{
    private final Logger logger = Logger.getLogger(CrawlManagerService.class.getName());

    private final FrontierService frontierService;

    private final Queue<ChromeDriver> driverQueue;

    private final ExecutorService executorService;

    private final Queue<Future<PageCrawl>> futureList;

    public CrawlManagerService(FrontierService frontierService, int threadCount)
    {
        this.frontierService = frontierService;

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        executorService = Executors.newFixedThreadPool(threadCount);
        futureList = new ConcurrentLinkedQueue<>();

        driverQueue = new LinkedList<>();
        for (int i = 0; i < threadCount; i++) {
            driverQueue.add(new ChromeDriver(options));
        }

    }

    public void run() {
        Page page;
        while((page = frontierService.getNextPage()) != null || !futureList.isEmpty()) {

            if (!futureList.isEmpty()) {

                Future<PageCrawl> polledFuture = futureList.poll();
                if (polledFuture.isDone()) {
                    try
                    {
                        PageCrawl pageCrawl = polledFuture.get();
                        driverQueue.add(pageCrawl.getChromeDriver());
                    }
                    catch (InterruptedException | ExecutionException e)
                    {
                        logger.severe(e.getMessage());
                    }
                }
                else {
                    futureList.add(polledFuture);
                }
            }

            if (page != null) {
                PageCrawl pageCrawl = new PageCrawl(page, driverQueue.poll());
                Future<PageCrawl> future = executorService.submit(pageCrawl);
                futureList.add(future);
            }

        }
    }
}

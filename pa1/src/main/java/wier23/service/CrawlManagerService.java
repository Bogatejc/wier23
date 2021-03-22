package wier23.service;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import wier23.entity.Page;

@Service
public class CrawlManagerService
{
    public static final int THREAD_COUNT = 5;

    private final Logger logger = Logger.getLogger(CrawlManagerService.class.getName());

    private final FrontierService frontierService;

    private final ChromeOptions chromeOptions;

    private final Queue<ChromeDriver> driverQueue;

    private final ExecutorService executorService;

    public CrawlManagerService(FrontierService frontierService, int threadCount)
    {
        this.frontierService = frontierService;

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        chromeOptions = options;

        executorService = Executors.newFixedThreadPool(threadCount);

        driverQueue = new LinkedList<>();
        for (int i = 0; i < threadCount; i++) {
            driverQueue.add(new ChromeDriver(chromeOptions));
        }

    }

    public void run() {
        Page page;
        logger.log(Level.INFO, "Printing urls...");
        while((page = frontierService.getNextPage()) != null) {
            logger.log(Level.INFO, page.getUrl());
        }
    }
}

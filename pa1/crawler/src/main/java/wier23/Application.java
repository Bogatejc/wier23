package wier23;

import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.EventListener;

import wier23.service.CrawlManagerService;

@SpringBootApplication
public class Application
{
    private static final Logger logger = Logger.getLogger(Application.class.getName());

    private static int threadCount = 5;

    private final CrawlManagerService crawlManagerService;

    public Application(@Lazy CrawlManagerService crawlManagerService)
    {
        this.crawlManagerService = crawlManagerService;
    }

    public static void main(String[] args) {
        try
        {
            if(args.length > 0)
            {
                System.setProperty("webdriver.chrome.driver", args[0]);
                threadCount = Integer.parseInt(args[1]);
            }
            else
            {
                logger.severe("Chrome driver path was not specified!");
                return;
            }
        } catch (NullPointerException | NumberFormatException e) {
            logger.severe("Invalid parameter for number of threads. Using default value (" + threadCount + ").");
        }


        Thread chromeDriverThread = new Thread(() -> {
            try{
                Runtime.getRuntime().exec("taskkill /im chromedriver.exe /f");
                Thread.sleep(10000);

            } catch(Exception e){
                // do nothing
            }
        });
        Runtime.getRuntime().addShutdownHook(chromeDriverThread);

        Thread chromeThread = new Thread(() -> {
            try{
                Runtime.getRuntime().exec("taskkill /im chrome.exe /f");
                Thread.sleep(10000);

            } catch(Exception e){
                // do nothing
            }
        });
        Runtime.getRuntime().addShutdownHook(chromeThread);

        SpringApplication.run(Application.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        logger.info("Starting to crawl.");
        crawlManagerService.run();
    }

    @Bean
    public int threadCount() {
        return threadCount;
    }
}

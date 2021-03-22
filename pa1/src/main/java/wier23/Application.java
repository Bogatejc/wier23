package wier23;

import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import lombok.AllArgsConstructor;
import wier23.service.CrawlManagerService;

@SpringBootApplication
@AllArgsConstructor
public class Application
{
    private final Logger logger = Logger.getLogger(Application.class.getName());

    private final CrawlManagerService crawlManagerService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        logger.info("Starting to crawl.");
        crawlManagerService.run();
    }


}

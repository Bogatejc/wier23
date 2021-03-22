package wier23.service;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Page;

@Service
@AllArgsConstructor
public class CrawlManagerService
{
    private final Logger logger = Logger.getLogger(CrawlManagerService.class.getName());

    private final FrontierService frontierService;

    public void run() {
        Page page;
        logger.log(Level.INFO, "Printing urls...");
        while((page = frontierService.getNextPage()) != null) {
            logger.log(Level.INFO, page.getUrl());
        }
    }

}

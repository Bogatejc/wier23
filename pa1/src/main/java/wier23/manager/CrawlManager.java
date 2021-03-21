package wier23.manager;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.service.PageService;

@Service
public class CrawlManager
{
    private final Logger logger = Logger.getLogger(CrawlManager.class.getName());

    private final PageService pageService;

    private Queue<Page> frontier;

    @PostConstruct
    private void postConstruct() {
        logger.log(Level.INFO, "Starting to crawl.");
    }

    public CrawlManager(PageService pageService) {
        this.pageService = pageService;

        // Fetch frontier from database
        logger.log(Level.INFO, "Fetching frontier from database.");
        frontier = pageService.getFrontier();

        // If database has no pages for frontier, load the base pages
        if (frontier.isEmpty()) {
            logger.log(Level.WARNING, "No pages for frontier found in database, loading base pages.");
            frontier = getBasePages();
            logger.log(Level.WARNING, "Base pages successfully loaded!");
        }
    }

    /**
     * This method reads the file "baseUrls" in resource folder line by line and creates page objects for
     * starting frontier.
     * @return list of base pages
     */
    private LinkedList<Page> getBasePages() {
        LinkedList<Page> basePages = new LinkedList<>();

        File baseUrls;
        try {
            baseUrls = ResourceUtils.getFile("classpath:baseUrls");
        }
        catch (FileNotFoundException e)
        {
            logger.severe(e.getMessage());
            return new LinkedList<>();
        }

        try(BufferedReader bufferedReader = new BufferedReader(new FileReader(baseUrls))) {
            while(bufferedReader.ready()) {
                Page page = new Page();
                page.setUrl(bufferedReader.readLine());
                page.setPageType(PageType.FRONTIER);
                basePages.add(page);
            }

        }
        catch (IOException e) {
            logger.severe(e.getMessage());

        }

        return basePages;
    }

}

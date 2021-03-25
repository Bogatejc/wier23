package wier23.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import wier23.Utils;
import wier23.entity.Link;
import wier23.entity.Page;
import wier23.entity.PageType;
import wier23.entity.Site;

@Service
public class FrontierService
{
    private final Logger logger = Logger.getLogger(FrontierService.class.getName());

    private final ConcurrentLinkedQueue<Page> frontier;

    private final HashMap<String, LocalDateTime> domainsHashMap = new HashMap<>();

    private final SiteService siteService;

    private final LinkService linkService;

    private final PageService pageService;

    public FrontierService(PageService pageService, SiteService siteService, LinkService linkService)
    {
        this.siteService = siteService;
        this.linkService = linkService;
        this.pageService = pageService;

        // Fetch frontier from database
        logger.log(Level.INFO, "Fetching frontier from database.");
        frontier = new ConcurrentLinkedQueue<>(pageService.getFrontier());

        // If database has no pages for frontier, load the base pages
        if (frontier.isEmpty())
        {
            logger.log(Level.WARNING, "No pages for frontier found in database, loading base pages.");

            Page page = new Page();
            page.setUrl("base");
            page.setPageType(PageType.HTML);
            page = pageService.savePage(page);

            getBasePages(page);
            logger.log(Level.WARNING, "Base pages successfully loaded!");
        }
    }

    /**
     * This method checks if frontier is empty.
     * @return true, if frontier is empty; false, if frontier is not empty
     */
    public boolean isEmpty() {
        return frontier.isEmpty();
    }


    /**
     * This method polls a page from the queue and checks if crawler is allowed to access it. If the crawler
     * is not allowed to access it, it re-adds it back into the queue and polls the next page.
     * @return the next page to be crawled
     */
    public Page getNextPage()
    {
        while(!frontier.isEmpty())
        {
            Page polledPage = frontier.poll();

            String domain = Utils.getDomainFromUrl(polledPage.getUrl());
            if (!domainsHashMap.containsKey(domain))
            {
                domainsHashMap.put(domain, LocalDateTime.now());
                return polledPage;
            }
            else
            {
                Integer domainDelay = siteService.findByDomain(domain)
                        .map(Site::getDomainDelay)
                        .orElse(5);

                // TODO check robots.txt for any other possible restrictions
                LocalDateTime lastAccessTime = domainsHashMap.get(domain);
                if (LocalDateTime.now().isAfter(lastAccessTime.plusSeconds(domainDelay)))
                {
                    domainsHashMap.put(domain, LocalDateTime.now());
                    return polledPage;
                }
                else
                {
                    frontier.add(polledPage);
                }
            }
        }
        return null;
    }

    public void addToFrontier(Page page) {
        frontier.add(page);
    }

    /**
     * This method reads the file "baseUrls" in resource folder line by line and creates page objects for
     * starting frontier.
     * @return list of base pages
     */
    public void getBasePages(Page basePage)
    {
        File baseUrls;
        try
        {
            baseUrls = ResourceUtils.getFile("classpath:baseUrls");
        }
        catch (FileNotFoundException e)
        {
            logger.severe(e.getMessage());
            return;
        }

        try(BufferedReader bufferedReader = new BufferedReader(new FileReader(baseUrls)))
        {
            while(bufferedReader.ready()) {
                String url = bufferedReader.readLine();
                try
                {
                    Page newPage = new Page();
                    newPage.setUrl(url);
                    newPage.setPageType(PageType.FRONTIER);

                    Link link = new Link();
                    link.setPageFrom(basePage);
                    link.setPageTo(newPage);

                    linkService.saveLink(link);

                    addToFrontier(newPage);
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                    logger.severe(url + " " + e.getMessage());
                }
            }
        }
        catch (IOException e)
        {
            logger.severe(e.getMessage());
        }
    }
}

package wier23.manager;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import wier23.Utils;
import wier23.entity.Site;
import wier23.service.FrontierService;
import wier23.service.PageService;
import wier23.service.SiteService;

@Service
public class CrawlManager
{
    private final Logger logger = Logger.getLogger(CrawlManager.class.getName());

    private final FrontierService frontierService;

    private final PageService pageService;

    private final SiteService siteService;

    private HashMap<String, LocalDateTime> domainsHashMap = new HashMap<>();

    public CrawlManager(FrontierService frontierService, PageService pageService, SiteService siteService)
    {
        this.frontierService = frontierService;
        this.pageService = pageService;
        this.siteService = siteService;
    }

    @PostConstruct
    private void postConstruct() {
        logger.log(Level.INFO, "Starting to crawl.");
        run();
    }

    private void run() {
        // TODO
    }

    private void submitUrl(String url) {
        String domainName = Utils.getDomainFromUrl(url);

        if (!domainsHashMap.containsKey(domainName)) {
            domainsHashMap.put(domainName, LocalDateTime.now());
        }
        else {
            Integer domainDelay = siteService.findByDomain(domainName)
                    .map(Site::getDomainDelay)
                    .orElse(5);

            LocalDateTime lastAccessTime = domainsHashMap.get(domainName);
            if (LocalDateTime.now().isAfter(lastAccessTime.plusSeconds(domainDelay))) {

            }

        }


    }

}

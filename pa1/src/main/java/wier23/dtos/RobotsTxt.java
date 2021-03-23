package wier23.dtos;

import java.util.LinkedList;
import java.util.List;

public class RobotsTxt {

    private List<String> allowedPages;
    private List<String> disallowedPages;
    private List<String> sitemaps;
    private int crawlDelay;

    public RobotsTxt()
    {
        allowedPages = new LinkedList<>();
        disallowedPages = new LinkedList<>();
        sitemaps = new LinkedList<>();
    }

    public List<String> getAllowedPages() {
        return allowedPages;
    }

    public List<String> getDisallowedPages() {
        return disallowedPages;
    }

    public List<String> getSitemaps() {
        return sitemaps;
    }

    public int getCrawlDelay() {
        return crawlDelay;
    }

    public void setAllowedPages(List<String> allowedPages) {
        this.allowedPages = allowedPages;
    }

    public void setDisallowedPages(List<String> disallowedPages) {
        this.disallowedPages = disallowedPages;
    }

    public void setSitemaps(List<String> sitemaps) {
        this.sitemaps = sitemaps;
    }

    public void setCrawlDelay(int crawlDelay) {
        this.crawlDelay = crawlDelay;
    }
}

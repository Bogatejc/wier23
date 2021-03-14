package callable;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class PageCrawl implements Callable<PageCrawl>
{
    private final Logger logger = Logger.getLogger(PageCrawl.class.getName());
    static final int TIMEOUT = 60000;   // one minute

    private final URL url;
    private final Set<URL> urlList = new HashSet<>();

    public PageCrawl(URL url) {
        this.url = url;
    }

    @Override
    public PageCrawl call() throws Exception {
        Document document;
        document = Jsoup.parse(url, TIMEOUT);

        Elements links = document.select("a[href]");

        for (Element link : links) {
            String href = link.attr("href");
            if (StringUtils.isBlank(href) ||  href.startsWith("#")) {
                continue;
            }
            try {
                URL nextUrl = new URL(url, href);
                // NOTE: the set will not store the same url twice, even if two different objects.
                urlList.add(nextUrl);
            } catch (MalformedURLException e) {
                // just ignore bad URLs
            }
        }
        return this;
    }

    public void dump() {
        for (URL url1 : urlList) {
            logger.log(Level.INFO, "Links to " + url1.toString());
        }
    }
}

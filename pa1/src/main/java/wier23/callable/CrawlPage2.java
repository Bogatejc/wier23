package wier23.callable;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

// TODO delete this class
public class CrawlPage2 implements Callable<CrawlPage2>
{
    private final Logger logger = Logger.getLogger(CrawlPage2.class.getName());
    static final int TIMEOUT = 60000;   // one minute

    private final URL url;
    private final int depth;
    private final Set<URL> urlList = new HashSet<>();

    public CrawlPage2(URL url, int depth) {
        this.url = url;
        this.depth = depth;
    }

    @Override
    public CrawlPage2 call() throws Exception {
        Document document;
        logger.info("Visiting (" + depth + "): " + url.toString());

        document = Jsoup.parse(url, TIMEOUT);
        processLinks(document.select("a[href]"));
        return this;
    }

    private void processLinks(Elements links) {
        for (Element link : links) {
            String href = link.attr("href");

            if (StringUtils.isBlank(href) ||  href.startsWith("#")) {
                continue;
            }

            try {
                URL nextUrl = new URL(url, href);
                urlList.add(nextUrl);
            } catch (MalformedURLException e) {
                // ignore bad urls
            }
        }
    }

    public Set<URL> getUrlList()
    {
        return urlList;
    }

    public int getDepth()
    {
        return depth;
    }
}

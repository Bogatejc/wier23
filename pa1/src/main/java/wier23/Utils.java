package wier23;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.netpreserve.urlcanon.Canonicalizer;
import org.netpreserve.urlcanon.ParsedUrl;
import wier23.dtos.RobotsTxt;

public class Utils
{
    private static final Logger logger = Logger.getLogger(Utils.class.getName());

    private Utils() {
        // Private constructor to hide public implicit one
    }

    public static String getDomainFromUrl(String url) {
        URI uri;
        try
        {
            uri = new URI(url);
        }
        catch (URISyntaxException e)
        {
            logger.log(Level.SEVERE, e.getMessage());
            return url;
        }

        String domain = uri.getHost();
        if (domain == null) {
            logger.log(Level.SEVERE, "Can't parse domain from %s", url);
            return url;
        }
        return domain.startsWith("www.") ? domain.substring(4) : domain;
    }

    /**
     * This method converts URL to URI
     * @return canonical url
     */
    public static String createCanonicalUrl(String url) throws MalformedURLException, URISyntaxException {
        URL newUrl = new URL(url);
        URI uri = new URI(newUrl.getProtocol(),
                newUrl.getUserInfo(),
                newUrl.getHost(),
                newUrl.getPort(),
                newUrl.getPath(),
                newUrl.getQuery(),
                newUrl.getRef());

        ParsedUrl parsedUrl = ParsedUrl.parseUrl(uri.normalize().toString());
        Canonicalizer.WHATWG.canonicalize(parsedUrl);

        String result = parsedUrl.toString();

        return result.length() >= 3000 ? result.substring(0, 2999) : result;
    }

    public static RobotsTxt parseRobotsTxt(String robotsContent)
    {

        if(robotsContent.isEmpty() || robotsContent == null)
        {
            return null;
        }
        RobotsTxt robotsTxt = new RobotsTxt();
        for(String line : robotsContent.split("\n"))
        {
            line = line.trim();

            // check for allowed pages
            if(line.matches("^([Aa]llow:) (\\/.*)$"))
            {
                robotsTxt.getAllowedPages().add(line.split("^[^:]*:\\s*")[1]);
            }
            // check for disallowed pages
            if(line.matches("^([Dd]isallow:) (\\/.*)$"))
            {
                if(line.contains("Sitemap:"))
                {
                    String[] parts = line.split("Sitemap:");
                    robotsTxt.getDisallowedPages().add(parts[0].split("^[^:]*:\\s*")[1]);
                    robotsTxt.getSitemaps().add(parts[1].split("^[^:]*:\\s*")[1]);
                } else {
                    robotsTxt.getDisallowedPages().add(line.split("^[^:]*:\\s*")[1]);
                }
            }
            // check for sitemap
            if(line.matches("^([Ss]itemap:) (.*)$"))
            {
                robotsTxt.getSitemaps().add(line.split("^[^:]*:\\s*")[1]);
            }
            // check for crawl-delay pages
            if(line.matches("^([Cc]rawl-delay:) (.*)$"))
            {
                robotsTxt.setCrawlDelay(Integer.parseInt(line.split("^[^:]*:\\s*")[1]));
            }
        }
        return robotsTxt;
    }


}

package wier23;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

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
        return uri.toString();
    }
}

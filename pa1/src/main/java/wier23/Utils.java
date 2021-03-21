package wier23;

import java.net.URI;
import java.net.URISyntaxException;
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
}

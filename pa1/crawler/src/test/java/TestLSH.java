import org.junit.Test;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import wier23.lsh.LSH;

import java.util.*;
import java.util.logging.Logger;

public class TestLSH {

    private static final Logger logger = Logger.getLogger(TestLSH.class.getName());

    // Link 1: https://www.gov.si
    // Link 2: https://www.gov.si/#content
    // Computed jaccard distance is: 0.0 -> pages are the same

    // Link 1: http://www.widgets.com/blue-widgets?cat=3&color=blue
    // Link 2: https://www.domainking.com/index.php
    // Computed jaccard distance is: 0.0 -> pages are the same

    // Link 1: https://sitebulb.com/hints/page-speed/dom-width-exceeds-recommended-60-nodes-wide/
    // Link 2: https://sitebulb.com/hints/page-speed/dom-depth-exceeds-recommended-32-nodes-deep/
    // Computed jaccard distance is: 0.01662049861495845 -> pages are very similar, page structures are the same but there is some difference in the content

    // Link 1: https://buffer.com/library/social-media-manager-checklist/
    // Link 2: https://buffer.com/resources/social-media-manager-checklist/
    // Computed jaccard distance is: 0.1287313432835821 -> main content is the same, but there is some difference in page structure

    // Link 1: https://www.caltonnutrition.com/tag/protein-powder/
    // Link 2: https://www.caltonnutrition.com/tag/whey/
    // Computed jaccard distance is: 0.0 -> links are different, page is the same

    @Test
    public void testLsh() {
        System.setProperty("webdriver.chrome.driver", "/Users/markbogataj/Faks/Masters/1.letnik/WIER/wier23/Selenium/chromedriver");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("user-agent=fri-wier-wier23");
        ChromeDriver chromeDriver = new ChromeDriver(options);

        Set<String> set1 = new HashSet<>();
        Set<String> set2 = new HashSet<>();

        chromeDriver.get("https://www.caltonnutrition.com/tag/whey/");
        String content = chromeDriver.findElementByTagName("body").getText();
        for(String line : content.split("\n")) {
            for(String token : line.split(" ")) {
                set1.add(token);
            }
        }

        chromeDriver.get("https://www.caltonnutrition.com/tag/protein-powder/");
        content = chromeDriver.findElementByTagName("body").getText();
        for(String line : content.split("\n")) {
            for(String token : line.split(" ")) {
                set2.add(token);
            }
        }

        chromeDriver.quit();

        LSH lsh = new LSH(set1, set2);
        double jaccDist = lsh.compute();
        System.out.println("Computed jaccard distance is: " + jaccDist);
    }
}

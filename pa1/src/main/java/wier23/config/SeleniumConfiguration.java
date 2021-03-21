package wier23.config;

import javax.annotation.PostConstruct;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeleniumConfiguration
{

    @PostConstruct
    void postConstruct()
    {
        System.setProperty("webdriver.chrome.driver", "D:/Programs/Selenium/chromedriver.exe");
    }

    @Bean
    public ChromeDriver chromeDriver()
    {
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--headless");
        return new ChromeDriver(chromeOptions);
    }
}

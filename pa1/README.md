## Project description
This is a Java implementation of a web crawler with SpringBoot, that crawls over pages from `gov.si` domain and collects images, binary files and links to new pages.
The crawler is using Selenium ChromeDriver for headless browsing.

### Instructions
- This web crawler uses PostgreSQL database for storing the acquired data. Prepare a new PostgreSQL database
  and create a new schema called `crawldb`.
- Open `pa1/crawler/src/main/resources/application.yml` and set the database URL, username and password accordingly.
  Example:
  ```properties
  url: jdbc:postgresql://localhost:5432/wier
  username: postgres
  password: verysecretpassword
  ```
- First make sure you have Java 14 installed by typing the following into terminal:
  ```bash
  java --version
  # java 14 2020-03-17
  # Java(TM) SE Runtime Environment (build 14+36-1461)
  # Java HotSpot(TM) 64-Bit Server VM (build 14+36-1461, mixed mode, sharing)
  ```
- To now run the crawler, you will need [Maven](https://maven.apache.org/). Move to the root of the project and run the following command:
  ```bash
  mvn spring-boot:run -D spring-boot.run.arguments='{path-to-selenium-chromedriver} {number-of-workers}'
  # example
  mvn spring-boot:run -D spring-boot.run.arguments='D:/Programs/Selenium/chromedriver.exe 4'
  ```
- Warning: Stopping the application will force close all instances of chromedriver and chrome. This was the only way we found,
  to actually close everything started by the application (from IDE).

### LSH testing
[Here](crawler/src/main/java/wier23/lsh/LSH.java) we have an implementation of locality-sensitive hashing method.
We also provided some helper test for easy running and testing. Go to `./src/test/java/TestLSH.java`,
where you can set your own links to get crawled. At the end of the test we get computed Jaccard distance.

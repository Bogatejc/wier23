## Project description
This is a Java implementation of a web crawler with SpringBoot, that crawls over pages from `gov.si` domain and collects images, binary files and links to new pages.
The crawler is using Selenium ChromeDriver for headless browsing.

### Instructions
- Create crawldb schema
`JAKOB REŠI ME ne vem kako se naj to naredi`
- Run crawler
`Podobno tukaj`

### LSH testing
[Here](crawler/src/main/java/wier23/lsh/LSH.java) we have an implementation of locality-sensitive hashing method.
We also provided some helper test for easy running and testing. Go to `./src/test/java/TestLSH.java`,
where you can set your own links to get crawled. At the end of the test we get computed Jaccard distance.

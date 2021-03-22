package wier23.manager;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.BiPredicate;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import wier23.callable.CrawlPage2;

// TODO delete this class
public class CrawlManager2
{
    public static final int THREAD_COUNT = 5;
    private static final long PAUSE_TIME = 1000;

    private final List<Future<CrawlPage2>> futures = new ArrayList<>();
    private final ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);

    private final int maxUrls;
    private final BiPredicate<URL, Integer> shouldVisit;

    private Set<URL> masterList = new HashSet<>();
    private String urlBase;

    public CrawlManager2(int maxUrls, BiPredicate<URL, Integer> shouldVisit) {
        this.maxUrls  = maxUrls;
        this.shouldVisit = shouldVisit;
    }

    public void go(URL start) throws InterruptedException {
        submitNewURL(start, 0);
        while (checkPageGrabs());
    }

    /**
     * This method is charged with checking the status of all the threads
     * and collecting their work effort.
     *
     * @return false = all the threads are done.
     * @throws InterruptedException
     */
    private boolean checkPageGrabs() throws InterruptedException {
        Thread.sleep(PAUSE_TIME);
        Set<CrawlPage2> pageSet = new HashSet<>();
        Iterator<Future<CrawlPage2>> iterator = futures.iterator();

        while (iterator.hasNext()) {
            Future<CrawlPage2> future = iterator.next();
            if (future.isDone()) {
                iterator.remove();
                try {
                    pageSet.add(future.get());
                } catch (InterruptedException e) {
                    // skip pages that load too slow
                } catch (ExecutionException ignored) {
                    // Empty
                }
            }
        }

        for (CrawlPage2 grabPage : pageSet) {
            addNewURLs(grabPage);
        }

        return (!futures.isEmpty());
    }

    /**
     * Get the URLs from the grab page object.
     * remove any anchor references
     * save the url into the to-do list.
     *
     * @param grabPage object containing the URL list
     */
    private void addNewURLs(CrawlPage2 grabPage) {
        for (URL url : grabPage.getUrlList()) {
            if (url.toString().contains("#")) {
                try {
                    url = new URL(StringUtils.substringBefore(url.toString(), "#"));
                } catch (MalformedURLException e) {
                }
            }

            testAndSubmitNewURL(url, grabPage.getDepth() + 1);
        }
    }

    /**
     * Check if the URL passes muster and add it to the work list
     *
     * @param url
     * @param depth
     */
    private void testAndSubmitNewURL(URL url, int depth) {
        if (internalShouldVisit(url) && shouldVisit.test(url, depth)) {
            submitNewURL(url, depth);
        }
    }

    /**
     * Do the work of actually adding a work item.
     *
     * @param url
     * @param depth
     */
    private void submitNewURL(URL url, int depth) {
        masterList.add(url);

        CrawlPage2 grabPage = new CrawlPage2(url, depth);
        Future<CrawlPage2> future = executorService.submit(grabPage);
        futures.add(future);
    }

    /**
     * Some things we need to control inside the manager itself.
     * Like, do not visit the same page twice and stay within
     * the maximum.
     *
     * @param url
     * @return
     */
    private boolean internalShouldVisit(URL url) {
        if (masterList.contains(url)) {
            return false;
        }
        return masterList.size() < maxUrls;
    }

    public void write(String path) throws IOException {
        FileUtils.writeLines(new File(path), masterList);
    }

    public Set<URL> getMasterList() {
        return masterList;
    }
}

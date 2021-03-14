

import org.junit.Test;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import callable.PageCrawl;

public class TestPageCrawl
{
    @Test
    public void basic() throws MalformedURLException, ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Future<PageCrawl> future = executorService.submit(new PageCrawl(new URL("https://www.gov.si/")));
        PageCrawl done = future.get();
        done.dump();
    }
}

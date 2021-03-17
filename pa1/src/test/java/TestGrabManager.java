import org.apache.commons.lang3.time.StopWatch;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.internal.util.reflection.Whitebox;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.function.BiPredicate;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import wier23.callable.CrawlPage;
import wier23.manager.CrawlManager;

public class TestGrabManager {

	static final int SIZE = 5;

	@Test
	@Ignore
	public void happy() throws IOException, InterruptedException {
		BiPredicate<URL, Integer>
			shouldVisit = (url, depth) -> url.getHost().equals("news.yahoo.com");
			shouldVisit = shouldVisit.and( (url, depth) -> depth < 5);
			shouldVisit = shouldVisit.and( (url, depth) -> url.getPath().contains("obama"));

		CrawlManager grabManager = new CrawlManager(15, shouldVisit);
		StopWatch stopWatch = new StopWatch();

		stopWatch.start();

		grabManager.go(new URL("http://news.yahoo.com"));

		stopWatch.stop();

		System.out.println("Found " + grabManager.getMasterList().size() + " urls");
		System.out.println("in " + stopWatch.getTime() / 1000 + " seconds");

		grabManager.write("urllist.txt");
	}


	@Test
	public void testShouldVisit() throws IOException, InterruptedException, ExecutionException {

		Set<URL> urls = new HashSet<>();
		urls.add(new URL("http://ignore.com"));
		urls.add(new URL("http://example.com/normal"));
		urls.add(new URL("http://example.com/without#anchor"));
		urls.add(new URL("http://example.com/nopdfs.pdf"));
		urls.add(new URL("http://example.com/extra1"));
		urls.add(new URL("http://example.com/extra2"));
		urls.add(new URL("http://example.com/extra3"));

		// mock out grab page so we can control urls returned
		CrawlPage mockGrab = mock(CrawlPage.class);
		when(mockGrab.getUrlList()).thenReturn(urls);

		// mock a future object to return our grabber
		Future<CrawlPage> mockFuture = mock(Future.class);
		when(mockFuture.isDone()).thenReturn(true);
		when(mockFuture.get()).thenReturn(mockGrab);

		// return our future
		ExecutorService mockExecutor = mock(ExecutorService.class);
		when(mockExecutor.submit(any(Callable.class))).thenReturn(mockFuture);

		// Replacement for the old builtin shouldVisit() method
		BiPredicate<URL, Integer>
			shouldVisit =                   (url, depth) -> url.getHost().equals("example.com");
			shouldVisit = shouldVisit.and(  (url, depth) -> depth < 2);
			shouldVisit = shouldVisit.and(  (url, depth) -> !url.getPath().endsWith(".pdf"));

		CrawlManager grabManager = new CrawlManager(SIZE, shouldVisit);
		Whitebox.setInternalState(grabManager, "executorService", mockExecutor);
		grabManager.go(new URL("http://example.com"));

		Set<URL> visited = grabManager.getMasterList();
		assertEquals(SIZE, visited.size());
		assertTrue(visited.contains(new URL("http://example.com/normal")));
		assertTrue(visited.contains(new URL("http://example.com/without")));
		assertFalse(visited.contains(new URL("http://example.com/without#anchor")));
		assertFalse(visited.contains(new URL("http://example.com/nopdfs.pdf")));
	}
}
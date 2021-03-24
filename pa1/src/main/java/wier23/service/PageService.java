package wier23.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import java.util.Queue;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.repository.PageRepository;

@Service
@AllArgsConstructor
@Transactional(isolation = Isolation.SERIALIZABLE)
public class PageService
{

    private final PageRepository pageRepository;

    private final LinkService linkService;

    public Page savePage(Page page) {
        return pageRepository.saveAndFlush(page);
    }

    public void saveAllPages(Collection<Page> pageList) {
        pageRepository.saveAll(pageList);
        pageRepository.flush();
    }

    public void saveAllPages(Page... pages) {
        pageRepository.saveAll(Arrays.asList(pages.clone()));
        pageRepository.flush();
    }

    public Optional<Page> findByContentHash(byte[] contentHash) {
        // TODO query did not return a unique result: 2
        return pageRepository.findByContentHash(contentHash);
    }

    public void deletePage(Page page) {
        linkService.deleteAllLinksForPage(page);
        pageRepository.delete(page);
        pageRepository.flush();
    }

    public Optional<Page> findByUrl(String url) {
        return pageRepository.findByUrl(url);
    }

    public Optional<Page> findByIdWithLinks(Long id) {
        return pageRepository.findByIdWithLinks(id);
    }

    public boolean isUrlDuplicate(String url) {
        return pageRepository.existsPageByUrl(url);
    }

    public Queue<Page> getFrontier() {
        return pageRepository.findAllByPageType(PageType.FRONTIER);
    }
}

package wier23.service;

import java.util.Optional;
import java.util.Queue;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.repository.PageRepository;

@Service
@AllArgsConstructor
public class PageService
{

    private final PageRepository pageRepository;

    private final LinkService linkService;

    public Page savePage(Page page) {
        return pageRepository.save(page);
    }

    public Optional<Page> findByContentHash(byte[] contentHash) {
        // TODO query did not return a unique result: 2
        return pageRepository.findByContentHash(contentHash);
    }

    public void deletePage(Page page) {
        pageRepository.delete(page);
    }

    public Optional<Page> findByUrl(String url) {
        return pageRepository.findByUrl(url);
    }

    public boolean isUrlDuplicate(String url) {
        return pageRepository.existsPageByUrl(url);
    }

    public Queue<Page> getFrontier() {
        return pageRepository.findAllByPageType(PageType.FRONTIER);
    }
}

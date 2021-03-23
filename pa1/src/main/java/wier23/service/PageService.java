package wier23.service;

import java.util.Collection;
import java.util.Optional;
import java.util.Queue;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.repository.PageRepository;

@Service
@AllArgsConstructor
public class PageService
{
    private final Logger logger = Logger.getLogger(PageService.class.getName());

    private final PageRepository pageRepository;

    private final LinkService linkService;

    public Page savePage(Page page) {
        Page save = pageRepository.save(page);
        pageRepository.flush();
        return save;
    }

    public void saveAllPages(Collection<Page> pageList) {
        pageRepository.saveAll(pageList);
        pageRepository.flush();
    }

    public void deletePage(Page page) {
        linkService.deleteAllLinksForPage(page);
        pageRepository.delete(page);
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

    public boolean isContentDuplicate(String contentHash) {
        return pageRepository.existsPageByContentHash(contentHash);
    }

    public Queue<Page> getFrontier() {
        return pageRepository.findAllByPageType(PageType.FRONTIER);
    }
}

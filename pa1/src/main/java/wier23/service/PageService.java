package wier23.service;

import java.util.Queue;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Page;
import wier23.enums.PageType;
import wier23.repository.LinkRepository;
import wier23.repository.PageRepository;

@Service
@AllArgsConstructor
public class PageService
{
    private final Logger logger = Logger.getLogger(PageService.class.getName());

    private final PageRepository pageRepository;

    private final LinkRepository linkRepository;

    public Page savePage(Page page) {
        return pageRepository.save(page);
    }

    public void deletePage(Page page) {
        pageRepository.delete(page);
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

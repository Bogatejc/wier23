package wier23.service;

import java.util.LinkedList;
import java.util.List;

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

    public LinkedList<Page> getFrontier() {
        return pageRepository.findAllByPageType(PageType.FRONTIER);
    }
}

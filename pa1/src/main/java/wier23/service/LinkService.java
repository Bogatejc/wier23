package wier23.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Link;
import wier23.entity.Page;
import wier23.repository.LinkRepository;

@Service
@AllArgsConstructor
public class LinkService
{
    private final LinkRepository linkRepository;

    public void saveAllLinks(List<Link> linkList) {
        linkRepository.saveAll(linkList);
        linkRepository.flush();
    }

    public List<Link> getAllLinksForPage(Page page) {
        return linkRepository.findAllByPageFromOrPageTo(page, page);
    }

    public void deleteAllLinks(List<Link> linkList) {
        linkRepository.deleteAll(linkList);
        linkRepository.flush();
    }

    public void deleteAllLinksForPage(Page page) {
        deleteAllLinks(getAllLinksForPage(page));
    }
}

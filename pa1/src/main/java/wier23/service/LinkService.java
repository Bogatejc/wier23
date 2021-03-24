package wier23.service;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import wier23.entity.Link;
import wier23.entity.Page;
import wier23.repository.LinkRepository;

@Service
@AllArgsConstructor
@Transactional(isolation = Isolation.READ_COMMITTED)
public class LinkService
{
    private final Logger logger = Logger.getLogger(LinkService.class.getName());

    private final LinkRepository linkRepository;

    public Link saveLink(Link link) {
        return linkRepository.saveAndFlush(link);
    }

    public void saveAllLinks(List<Link> linkList) {
        try {
            linkRepository.saveAll(linkList);
            linkRepository.flush();
        } catch (DataIntegrityViolationException e)
        {
            logger.severe(e.getMessage());
        }
    }

    public void deleteAllLinks(List<Link> linkList) {
        try {
            linkRepository.deleteAll(linkList);
            linkRepository.flush();
        } catch (DataIntegrityViolationException e) {
            logger.severe(e.getMessage());
        }
    }

    public List<Link> getAllLinksForPage(Page page) {
        return linkRepository.findAllByPageFromOrPageTo(page, page);
    }

    public void deleteAllLinksForPage(Page page) {
        deleteAllLinks(getAllLinksForPage(page));
    }
}

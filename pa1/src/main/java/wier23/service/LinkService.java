package wier23.service;

import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import wier23.entity.Link;
import wier23.repository.LinkRepository;

@Service
@AllArgsConstructor
public class LinkService
{
    private final Logger logger = Logger.getLogger(LinkService.class.getName());

    @PersistenceContext
    private final EntityManager entityManager;

    private final LinkRepository linkRepository;

    @Transactional
    public Link saveLink(Link link) {
        return entityManager.merge(link);
    }

    @Transactional
    public void saveAllLinks(List<Link> linkList) {
        linkList.forEach(entityManager::merge);
    }

    @Transactional
    public void deleteLinkByPageId(Long pageId) {
        linkRepository.deleteLinkByPageId(pageId);
    }
}

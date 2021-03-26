package wier23.service;

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

    @PersistenceContext
    private final EntityManager entityManager;

    private final LinkRepository linkRepository;

    @Transactional
    public void saveLink(Link link) {
        entityManager.merge(link);
    }

    @Transactional
    public void deleteLinkByPageId(Long pageId) {
        linkRepository.deleteLinkByPageId(pageId);
    }
}

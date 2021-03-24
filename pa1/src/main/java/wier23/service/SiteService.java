package wier23.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import wier23.entity.Site;
import wier23.repository.SiteRepository;

@Service
@AllArgsConstructor
@Transactional(isolation = Isolation.SERIALIZABLE)
public class SiteService
{
    private final SiteRepository siteRepository;

    public Optional<Site> findByDomain(String domain) {
        return siteRepository.findByDomain(domain);
    }

    public Site saveSite(Site site)
    {
        return siteRepository.save(site);
    }
}

package wier23.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wier23.entity.Site;
import wier23.repository.SiteRepository;

@Service
@AllArgsConstructor
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

package wier23.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import wier23.entity.Site;

public interface SiteRepository extends JpaRepository<Site, Long>
{
    Optional<Site> findByDomain(String domain);
}

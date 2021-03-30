package wier23.repository;

import java.util.LinkedList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wier23.entity.Page;
import wier23.entity.PageType;

@Repository
public interface PageRepository extends JpaRepository<Page, Long>
{
    Optional<Page> findByUrl(String url);

    Optional<Page> findByContentHash(byte[] contentHash);

    LinkedList<Page> findAllByPageType(PageType pageType);

    LinkedList<Page> findAllByPageTypeOrderByIdAsc(PageType pageType);
}

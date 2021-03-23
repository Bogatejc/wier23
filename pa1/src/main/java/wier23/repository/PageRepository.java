package wier23.repository;

import java.util.LinkedList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import wier23.entity.Page;
import wier23.enums.PageType;

@Repository
public interface PageRepository extends JpaRepository<Page, Long>
{
    Optional<Page> findByUrl(String url);

    Optional<Page> findByContentHash(byte[] hash);

    boolean existsPageByUrl(String url);

    LinkedList<Page> findAllByPageType(PageType pageType);

    @Query(value = "SELECT page FROM Page page "
            + "LEFT JOIN FETCH page.toLinks "
            + "WHERE page.id = :pageId")
    Optional<Page> findByIdWithLinks(Long pageId);
}

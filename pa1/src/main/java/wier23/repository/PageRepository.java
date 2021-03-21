package wier23.repository;

import java.util.LinkedList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wier23.entity.Page;
import wier23.enums.PageType;

@Repository
public interface PageRepository extends JpaRepository<Page, Long>
{
    boolean existsPageByUrl(String url);

    boolean existsPageByContentHash(String contentHash);

    LinkedList<Page> findAllByPageType(PageType pageType);
}

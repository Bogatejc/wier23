package wier23.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import wier23.entity.Link;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long>
{
    @Modifying
    @Query("DELETE FROM Link link "
           + "WHERE link.pageFrom.id = :pageId OR "
           + "link.pageTo =: pageId "
    )
    void deleteLinkByPageId(@Param("pageId") Long pageId);
}

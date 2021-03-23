package wier23.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import wier23.entity.Link;
import wier23.entity.Page;

public interface LinkRepository extends JpaRepository<Link, Long>
{
    List<Link> findAllByPageFromOrPageTo(Page pageFrom, Page pageTo);
}

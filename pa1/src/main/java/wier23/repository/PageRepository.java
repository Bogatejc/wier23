package wier23.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wier23.entity.Page;

@Repository
public interface PageRepository extends JpaRepository<Page, Long>
{
}

package wier23.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import wier23.entity.Link;

public interface LinkRepository extends JpaRepository<Link, Long>
{
}

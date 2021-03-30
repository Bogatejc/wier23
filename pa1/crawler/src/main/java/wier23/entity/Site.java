package wier23.entity;

import java.util.Set;

import javax.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Table(
        schema = "crawldb"
)
public class Site
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(unique = true)
    private String domain;

    @Column(columnDefinition = "TEXT")
    private String robotsContent;

    @Column(columnDefinition = "TEXT")
    private String sitemapContent;

    private float domainDelay = 5f;

    @OneToMany(
            targetEntity = Page.class,
            mappedBy = "site"
    )
    private Set<Page> pages;

}

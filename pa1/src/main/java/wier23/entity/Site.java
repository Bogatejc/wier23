package wier23.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Site
{
    @Id
    @GeneratedValue
    private Long id;

    private String domain;

    private String robotsContent;

    private String sitemapContent;

    private Integer domainDelay = 5;

    @OneToMany(
            targetEntity = Page.class,
            cascade = CascadeType.ALL,
            mappedBy = "site",
            fetch = FetchType.LAZY
    )
    private Set<Page> pages;

}

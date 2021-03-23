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
public class Site
{
    @Id
    @GeneratedValue
    private Long id;

    private String domain;

    @Column(columnDefinition = "TEXT")
    private String robotsContent;

    @Column(columnDefinition = "TEXT")
    private String sitemapContent;

    private Integer domainDelay = 5;

    @OneToMany(
            targetEntity = Page.class,
            mappedBy = "site",
            fetch = FetchType.LAZY
    )
    private Set<Page> pages;

    @OneToOne(
            targetEntity = RobotRules.class,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    private RobotRules robotRules;

}

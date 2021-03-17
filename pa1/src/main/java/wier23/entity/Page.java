package wier23.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wier23.enums.PageType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Page
{
    @Id
    private Long id;

    private PageType pageType;

    private String url;

    private String htmlContent;

    private Integer httpStatusCode;

    private LocalDateTime accessedTime;

    @ManyToOne(targetEntity =  Site.class, optional = false)
    private Site site;

    @OneToMany(
            targetEntity = Link.class,
            cascade = CascadeType.ALL,
            mappedBy = "pageFrom",
            fetch = FetchType.LAZY
    )
    private Set<Link> fromLinks;

    @OneToMany(
            targetEntity = Link.class,
            cascade = CascadeType.ALL,
            mappedBy = "pageTo",
            fetch = FetchType.LAZY
    )
    private Set<Link> toLinks;

    @OneToMany(
            targetEntity = Image.class,
            cascade = CascadeType.ALL,
            mappedBy = "page",
            fetch = FetchType.LAZY
    )
    private Set<Image> images;

    @OneToMany(
            targetEntity = PageData.class,
            cascade = CascadeType.ALL,
            mappedBy = "page",
            fetch = FetchType.LAZY
    )
    private Set<PageData> pageData;

}

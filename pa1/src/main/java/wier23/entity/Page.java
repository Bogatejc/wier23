package wier23.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
@Table(
        name="page",
        indexes = {
                @Index(columnList = "contentHash"),
                @Index(columnList = "url")
        })
public class Page
{
    @Id
    @GeneratedValue
    private Long id;

    private PageType pageType;

    private String url;

    @Nullable
    private String htmlContent;

    @Nullable
    private String contentHash;

    @Nullable
    private Integer httpStatusCode;

    @Nullable
    private LocalDateTime accessedTime;

    @ManyToOne(targetEntity =  Site.class)
    private Site site;

    @OneToMany(
            targetEntity = Link.class,
            mappedBy = "pageFrom",
            fetch = FetchType.LAZY
    )
    private Set<Link> fromLinks;

    @OneToMany(
            targetEntity = Link.class,
            mappedBy = "pageTo",
            fetch = FetchType.LAZY
    )
    private Set<Link> toLinks;

    @OneToMany(
            targetEntity = Image.class,
            mappedBy = "page",
            fetch = FetchType.LAZY
    )
    private Set<Image> images;

    @OneToMany(
            targetEntity = PageData.class,
            mappedBy = "page",
            fetch = FetchType.LAZY
    )
    private Set<PageData> pageData;

}

package wier23.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.annotation.Nullable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
        schema = "crawldb",
        name = "page",
        indexes = {
                @Index(columnList = "url")
        })
public class Page implements Serializable
{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 3000)
    private String url;

    @Column(columnDefinition = "TEXT")
    private String htmlContent;

    @Nullable
    private Integer httpStatusCode;

    @Nullable
    private LocalDateTime accessedTime;

    @ManyToOne(
            targetEntity =  Site.class
    )
    private Site site;

    @ManyToOne(
            targetEntity = PageType.class
    )
    private PageType pageType;

    @OneToMany(
            targetEntity = Image.class,
            mappedBy = "page"
    )
    private Set<Image> images;

    @OneToMany(
            targetEntity = PageData.class,
            mappedBy = "page"
    )
    private Set<PageData> pageData;


    @OneToOne(
            cascade = CascadeType.ALL
    )
    private ContentHash contentHash;

}

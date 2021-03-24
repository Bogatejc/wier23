package wier23.entity;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.annotation.Nullable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
public class Page implements Serializable
{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private PageType pageType;

    @Column(length = 3000)
    private String url;

    @Nullable
    @Column(columnDefinition = "TEXT")
    private String htmlContent;

    @Nullable
    private byte[] contentHash;

    @Nullable
    private Integer httpStatusCode;

    @Nullable
    private LocalDateTime accessedTime;

    @ManyToOne(targetEntity =  Site.class)
    private Site site;

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

}

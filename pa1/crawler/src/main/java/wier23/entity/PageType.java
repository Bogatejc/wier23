package wier23.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
        schema = "crawldb"
)
public class PageType implements Serializable
{
    private static final long serialVersionUID = 1L;

    public static final PageType DUPLICATE = new PageType("DUPLICATE");
    public static final PageType FRONTIER = new PageType("FRONTIER");
    public static final PageType BINARY = new PageType("BINARY");
    public static final PageType HTML = new PageType("HTML");

    @Id
    @Column(length = 20)
    private String code;

    @OneToMany(
            targetEntity = Page.class,
            mappedBy = "pageType"
    )
    private List<Page> page;

    public PageType(String code) {
        this.code = code;
    }
}

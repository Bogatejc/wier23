package wier23.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(
        schema = "crawldb"
)
public class ContentHash implements Serializable
{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(unique = true)
    private byte[] hash;

    @OneToOne(
            targetEntity = Page.class,
            mappedBy = "contentHash"
    )
    private Page page;


}

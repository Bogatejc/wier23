package wier23.entity;

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
public class DataType
{
    @Id
    @Column(length = 20)
    private String code;

    @OneToMany(
            targetEntity = PageData.class,
            mappedBy = "dataType"
    )
    private List<PageData> pageData;
}

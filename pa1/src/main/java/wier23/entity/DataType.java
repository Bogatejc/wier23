package wier23.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

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
public class DataType implements Serializable
{
    public static final Set<String> allDataTypes = Set.of("PDF", "DOC", "DOCX", "PPT", "PPTX", "MP4", "MP3");

    public static final DataType PDF = new DataType("PDF");
    public static final DataType DOC = new DataType("DOC");
    public static final DataType DOCX = new DataType("DOCX");
    public static final DataType PPT = new DataType("PPT");
    public static final DataType PPTX = new DataType("PPTX");


    @Id
    @Column(length = 20)
    private String code;

    @OneToMany(
            targetEntity = PageData.class,
            mappedBy = "dataType"
    )
    private List<PageData> pageData;

    public DataType(String code) {
        this.code = code;
    }
}

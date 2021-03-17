package wier23.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wier23.enums.DataType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class PageData implements Serializable
{
    @Id
    private Long id;

    private byte[] data;

    private DataType dataType;

    @Id
    @ManyToOne(targetEntity =  Page.class, optional = false)
    private Page page;
}

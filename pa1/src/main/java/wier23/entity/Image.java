package wier23.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Image implements Serializable
{
    @Id
    private Long id;

    private String filename;

    private String contentType;

    private byte[] data;

    private LocalDateTime accessedTime;

    @Id
    @ManyToOne(targetEntity =  Page.class, optional = false)
    private Page page;
}

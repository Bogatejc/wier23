package wier23.entity;

import java.io.Serializable;

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
public class Link implements Serializable
{

    @Id
    @ManyToOne(targetEntity =  Page.class, optional = false)
    private Page pageFrom;

    @Id
    @ManyToOne(targetEntity =  Page.class, optional = false)
    private Page pageTo;

}

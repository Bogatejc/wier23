package wier23.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
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
public class Link
{
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(
            targetEntity =  Page.class,
            fetch = FetchType.LAZY
    )
    private Page pageFrom;

    @ManyToOne(
            targetEntity =  Page.class,
            fetch = FetchType.LAZY
    )
    private Page pageTo;

}

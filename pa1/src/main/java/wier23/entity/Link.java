package wier23.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(
            targetEntity =  Page.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private Page pageFrom;

    @ManyToOne(
            targetEntity =  Page.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private Page pageTo;

}

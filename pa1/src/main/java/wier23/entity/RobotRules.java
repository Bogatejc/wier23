package wier23.entity;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
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
public class RobotRules
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ElementCollection
    private List<String> allowed = new LinkedList<>();

    @ElementCollection
    private List<String> disallowed = new LinkedList<>();

    @ElementCollection
    private List<String> sitemap = new LinkedList<>();

    private int delay;

    @OneToOne(
            targetEntity = Site.class,
            fetch = FetchType.LAZY
    )
    private Site site;

}

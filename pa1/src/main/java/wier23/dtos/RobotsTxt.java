package wier23.dtos;

import java.util.LinkedList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RobotsTxt {

    private List<String> allowedPages = new LinkedList<>();
    private List<String> disallowedPages = new LinkedList<>();
    private List<String> sitemaps = new LinkedList<>();
    private float crawlDelay;
}

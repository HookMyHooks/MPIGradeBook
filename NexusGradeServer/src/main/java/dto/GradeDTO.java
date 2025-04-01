package dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeDTO {
    private Integer id;
    private LocalDate date;
    private Integer value;
    private Integer studentId;
    private Integer subjectId;
}

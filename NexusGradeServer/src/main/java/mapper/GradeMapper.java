package mapper;

import dto.GradeDTO;
import model.Grade;

public class GradeMapper {
    public static GradeDTO toDTO(Grade grade) {
        GradeDTO dto = new GradeDTO();
        dto.setId(grade.getId());
        dto.setDate(grade.getDate());
        dto.setValue(grade.getValue());
        dto.setStudentId(grade.getStudent().getId());
        dto.setSubjectId(grade.getSubject().getId());
        return dto;
    }
}
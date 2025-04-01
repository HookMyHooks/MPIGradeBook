package mapper;

import dto.SubjectDTO;
import model.Subject;

public class SubjectMapper {
    public static SubjectDTO toDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setId(subject.getId());
        dto.setName(subject.getName());
        dto.setTeacherId(subject.getTeacherid() != null ? subject.getTeacherid().getId() : null);
        return dto;
    }
}
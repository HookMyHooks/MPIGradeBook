package mapper;

import dto.TeacherDTO;
import model.Teacher;

public class TeacherMapper {
    public static TeacherDTO toDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setId(teacher.getId());
        dto.setUserId(teacher.getUsers().getId());
        dto.setFirstName(teacher.getFirstName());
        dto.setLastName(teacher.getLastName());
        return dto;
    }
}
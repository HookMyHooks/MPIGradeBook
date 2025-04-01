package mapper;

import dto.StudentDTO;
import model.Student;

public class StudentMapper {
    public static StudentDTO toDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setUserId(student.getUsers().getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        return dto;
    }
}
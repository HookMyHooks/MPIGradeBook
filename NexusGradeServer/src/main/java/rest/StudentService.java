package rest;

import dto.StudentDTO;
import mapper.StudentMapper;
import model.Student;
import repository.StudentRepository;

import java.util.List;

public class StudentService {
    private StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public StudentDTO getById(int id) {
        return StudentMapper.toDTO(repo.findById(id));
    }

    public List<StudentDTO> getAll() {
        return repo.findAll().stream().map(StudentMapper::toDTO).toList();
    }

    public StudentDTO getByUserId(int userId) {
        Student student = repo.findByUserId(userId);
        return student != null ? StudentMapper.toDTO(student) : null;
    }
}
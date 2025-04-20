package rest;

import dto.TeacherDTO;
import mapper.TeacherMapper;
import model.Teacher;
import repository.TeacherRepository;

import java.util.List;

public class TeacherService {
    private TeacherRepository repo;

    public TeacherService(TeacherRepository repo) {
        this.repo = repo;
    }

    public TeacherDTO getById(int id) {
        return TeacherMapper.toDTO(repo.findById(id));
    }

    public List<TeacherDTO> getAll() {
        return repo.findAll().stream().map(TeacherMapper::toDTO).toList();
    }

    public TeacherDTO getByUserId(int userId) {
        Teacher teacher = repo.findByUserId(userId);
        return teacher != null ? TeacherMapper.toDTO(teacher) : null;
    }
}
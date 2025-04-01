package rest;

import dto.TeacherDTO;
import mapper.TeacherMapper;
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
}
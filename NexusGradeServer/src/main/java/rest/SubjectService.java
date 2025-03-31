package rest;

import dto.SubjectDTO;
import mapper.SubjectMapper;
import repository.SubjectRepository;

import java.util.List;

public class SubjectService {
    private SubjectRepository repo;

    public SubjectService(SubjectRepository repo) {
        this.repo = repo;
    }

    public SubjectDTO getById(int id) {
        return SubjectMapper.toDTO(repo.findById(id));
    }

    public List<SubjectDTO> getAll() {
        return repo.findAll().stream().map(SubjectMapper::toDTO).toList();
    }
}
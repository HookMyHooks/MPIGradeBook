package rest;

import dto.GradeDTO;
import mapper.GradeMapper;
import repository.GradeRepository;

import java.util.List;

public
class GradeService {
    private GradeRepository repo;

    public GradeService(GradeRepository repo) {
        this.repo = repo;
    }

    public GradeDTO getById(int id) {
        return GradeMapper.toDTO(repo.findById(id));
    }

    public List<GradeDTO> getAll() {
        return repo.findAll().stream().map(GradeMapper::toDTO).toList();
    }
}
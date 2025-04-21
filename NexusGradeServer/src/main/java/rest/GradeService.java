package rest;

import dto.GradeDTO;
import mapper.GradeMapper;
import model.Grade;
import repository.GradeRepository;
import repository.StudentRepository;
import repository.SubjectRepository;

import java.util.List;

public
class GradeService {
    private final GradeRepository repo;
    private final StudentRepository studentRepo;
    private final SubjectRepository subjectRepo;

    public GradeService(GradeRepository repo, StudentRepository studentRepo, SubjectRepository subjectRepo) {
        this.repo = repo;
        this.studentRepo = studentRepo;
        this.subjectRepo = subjectRepo;
    }

    public GradeDTO getById(int id) {
        return GradeMapper.toDTO(repo.findById(id));
    }

    public List<GradeDTO> getAll() {
        return repo.findAll().stream().map(GradeMapper::toDTO).toList();
    }

    public GradeDTO create(GradeDTO dto) {
        if (dto.getStudentId() == null || dto.getSubjectId() == null) {
            return null;
        }

        if (studentRepo.findById(dto.getStudentId()) == null || subjectRepo.findById(dto.getSubjectId()) == null) {
            return null;
        }

        Grade grade = new Grade();
        grade.setValue(dto.getValue());
        grade.setStudent(studentRepo.findById(dto.getStudentId()));
        grade.setSubject(subjectRepo.findById(dto.getSubjectId()));

        repo.save(grade);
        dto.setId(grade.getId());
        return dto;
    }

    public GradeDTO update(int id, GradeDTO dto) {
        Grade existing = repo.findById(id);
        if (existing == null || dto.getStudentId() == null || dto.getSubjectId() == null) {
            return null;
        }

        if (studentRepo.findById(dto.getStudentId()) == null || subjectRepo.findById(dto.getSubjectId()) == null) {
            return null;
        }

        existing.setValue(dto.getValue());
        existing.setStudent(studentRepo.findById(dto.getStudentId()));
        existing.setSubject(subjectRepo.findById(dto.getSubjectId()));

        repo.update(existing);
        return dto;
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
}
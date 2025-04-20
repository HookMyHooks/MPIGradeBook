package rest;

import dto.SubjectDTO;
import mapper.SubjectMapper;
import model.Subject;
import model.Teacher;
import repository.SubjectRepository;
import repository.TeacherRepository;

import java.util.List;

public class SubjectService {
    private SubjectRepository repo;
    private TeacherRepository teacherRepo;

    public SubjectService(SubjectRepository repo, TeacherRepository teacherRepo) {
        this.repo = repo;
        this.teacherRepo = teacherRepo;
    }

    public SubjectDTO getById(int id) {
        return SubjectMapper.toDTO(repo.findById(id));
    }

    public List<SubjectDTO> getAll() {
        return repo.findAll().stream().map(SubjectMapper::toDTO).toList();
    }

    public SubjectDTO create(SubjectDTO dto) {
        if (dto.getTeacherId() == null) {
            return null;
        }

        Teacher teacher = teacherRepo.findById(dto.getTeacherId());
        if (teacher == null) {
            return null;
        }

        Subject subject = new Subject();
        subject.setName(dto.getName());
        subject.setTeacherId(teacher);
        repo.save(subject);

        dto.setId(subject.getId());
        return dto;
    }

    public SubjectDTO update(int id, SubjectDTO subjectDTO) {
        Subject existing = repo.findById(id);
        if (existing == null || subjectDTO.getTeacherId() == null) {
            return null;
        }
        Teacher teacher = teacherRepo.findById(subjectDTO.getTeacherId());
        if (teacher == null) {
            return null;
        }

        existing.setName(subjectDTO.getName());
        existing.setTeacherId(teacher);

        repo.update(existing);
        return SubjectMapper.toDTO(existing);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
}
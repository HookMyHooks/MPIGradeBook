package rest;

import dto.RegisterRequestDTO;
import dto.UserDTO;
import mapper.UserMapper;
import model.Student;
import model.Teacher;
import model.User;
import repository.StudentRepository;
import repository.TeacherRepository;
import repository.UserRepository;
import utils.JwtUtil;

import java.util.List;


//Client asks → Controller receives → Service decides → Repository fetches → Entity → Mapper → DTO → Back to client
public class UserService {

    private final UserRepository userRepo;
    private final StudentRepository studentRepo;
    private final TeacherRepository teacherRepo;

    public UserService(UserRepository userRepo, StudentRepository studentRepo, TeacherRepository teacherRepo) {
        this.userRepo = userRepo;
        this.studentRepo = studentRepo;
        this.teacherRepo = teacherRepo;
    }


    public UserDTO getById(int id) {
        return UserMapper.toDTO(userRepo.findById(id));
    }

    public List<UserDTO> getAll() {
        return userRepo.findAll().stream().map(UserMapper::toDTO).toList();
    }


    public String login(String username, String password) {
        User user = userRepo.findByUsername(username);


            String role = userRepo.isStudent(user.getId()) ? "STUDENT" :
                    userRepo.isTeacher(user.getId()) ? "TEACHER" :
                            "USER";

            if (user != null && user.getPassword().equals(password)) {
                String token = JwtUtil.generateToken(username,role);

                
            return "{\"token\": \"" + token + "\", \"role\": \"" + role + "\"}";
        }
        return null;
    }


    public boolean register(RegisterRequestDTO dto) {
        if (userRepo.findByUsername(dto.getUsername()) != null) return false;

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getUserPassword());
        user.setEmail(dto.getEmail());
        userRepo.save(user);

        if ("STUDENT".equalsIgnoreCase(dto.getRole())) {
            Student student = new Student();
            student.setUsers(user);
            student.setId(user.getId()); // assuming @MapsId, this links it
            student.setFirstName(dto.getFirstName());
            student.setLastName(dto.getLastName());
            studentRepo.save(student);
        } else if ("TEACHER".equalsIgnoreCase(dto.getRole())) {
            Teacher teacher = new Teacher();
            teacher.setUsers(user);
            teacher.setId(user.getId());
            teacher.setFirstName(dto.getFirstName());
            teacher.setLastName(dto.getLastName());
            teacherRepo.save(teacher);
        }

        return true;
    }

}
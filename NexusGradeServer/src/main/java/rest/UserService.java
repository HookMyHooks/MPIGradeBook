package rest;

import dto.LoginRequestDTO;
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

    public UserDTO getByEmail(String email) {
        return UserMapper.toDTO(userRepo.findByEmail(email));
    }

    public String login(String email, String password) {
        User user = userRepo.findByEmail(email);
        System.out.println("User from DB: " + user.getEmail());

        System.out.println("Provided: " + password);
        System.out.println("Stored: " + user.getPassword());

        String role;
        if (studentRepo.findByUserId(user.getId()) != null) {
            role = "STUDENT";
        } else if (teacherRepo.findByUserId(user.getId()) != null) {
            role = "TEACHER";
        } else {
            role = "USER";
        }

        if (user.getPassword().equals(password)) {
            String token = JwtUtil.generateToken(user.getUsername(), role);

            return "{\"token\": \"" + token + "\", \"role\": \"" + role + "\"}";
        }
        return null;
    }

    public boolean register(RegisterRequestDTO dto) {
        if (userRepo.findByUsername(dto.getUsername()) != null)
            return false;

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

    public boolean resetPassword(LoginRequestDTO dto) {
        User user = userRepo.findByEmail(dto.getEmail());
        if (user == null)
            return false;
        user.setPassword(dto.getPassword());
        userRepo.update(user);
        return true;

    }

}
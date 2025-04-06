package rest;

import dto.UserDTO;
import mapper.UserMapper;
import model.User;
import repository.UserRepository;
import utils.JwtUtil;

import java.util.List;


//Client asks → Controller receives → Service decides → Repository fetches → Entity → Mapper → DTO → Back to client
public class UserService {
    private UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public UserDTO getById(int id) {
        return UserMapper.toDTO(repo.findById(id));
    }

    public List<UserDTO> getAll() {
        return repo.findAll().stream().map(UserMapper::toDTO).toList();
    }


    public String login(String username, String password) {
        User user = repo.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return JwtUtil.generateToken(username);
        }
        return null;
    }

    public boolean register(String username, String password, String email) {
        if (repo.findByUsername(username) != null) return false;

        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // Ideally hash it
        user.setEmail(email);
        repo.save(user);
        return true;
    }
}
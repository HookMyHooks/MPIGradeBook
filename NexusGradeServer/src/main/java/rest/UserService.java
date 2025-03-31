package rest;

import dto.UserDTO;
import mapper.UserMapper;
import repository.UserRepository;

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
}
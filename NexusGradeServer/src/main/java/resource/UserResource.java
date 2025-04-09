package resource;
import dto.RegisterRequestDTO;
import dto.UserDTO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import repository.StudentRepository;
import repository.TeacherRepository;
import repository.UserRepository;
import rest.UserService;
import utils.JwtUtil;

import java.util.List;

@Path("/users")
public class UserResource {
    private final UserService service = new UserService(new UserRepository(),new StudentRepository(), new TeacherRepository());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserDTO> getAllUsers() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserDTO getUserById(@PathParam("id") int id) {
        return service.getById(id);
    }


    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UserDTO dto) {
        String responseJson = service.login(dto.getUsername(), dto.getPassword());
        if (responseJson == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
        }
        return Response.ok().entity(responseJson).build();
    }


    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(RegisterRequestDTO dto) {
        boolean success = service.register(dto);
        if (success) {
            String token = JwtUtil.generateToken(dto.getUsername(), dto.getRole());
            return Response.ok("{\"token\": \"" + token + "\", \"role\": \"" + dto.getRole() + "\"}").build();
        } else {
            return Response.status(Response.Status.CONFLICT).entity("Username already exists").build();
        }
    }


}

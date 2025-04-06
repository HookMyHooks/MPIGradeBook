package resource;
import dto.UserDTO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import repository.UserRepository;
import rest.UserService;

import java.util.List;

@Path("/users")
public class UserResource {
    private final UserService service = new UserService(new UserRepository());

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
        String token = service.login(dto.getUsername(), dto.getPassword());
        if (token == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
        }
        return Response.ok().entity("{\"token\": \"" + token + "\"}").build();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(UserDTO dto) {
        boolean success = service.register(dto.getUsername(), dto.getPassword(), dto.getUsername() + "@default.com");
        if (success) {
            return Response.ok("User registered").build();
        } else {
            return Response.status(Response.Status.CONFLICT).entity("Username already exists").build();
        }
    }
}

package resource;

import dto.TeacherDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import repository.TeacherRepository;
import rest.TeacherService;

import java.util.List;

@Path("/teachers")
public class TeacherResource {
    private final TeacherService service = new TeacherService(new TeacherRepository());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<TeacherDTO> getAllTeachers() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public TeacherDTO getTeacherById(@PathParam("id") int id) {
        return service.getById(id);
    }
}

package resource;

import dto.StudentDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import repository.StudentRepository;
import rest.StudentService;

import java.util.List;

@Path("/students")
public class StudentResource {
    private final StudentService service = new StudentService(new StudentRepository());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<StudentDTO> getAllStudents() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public StudentDTO getStudentById(@PathParam("id") int id) {
        return service.getById(id);
    }
}
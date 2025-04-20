package resource;

import dto.TeacherDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
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

    @GET
    @Path("/userId/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeacherByUserId(@PathParam("userId") int userId) {
        TeacherDTO teacherDTO = service.getByUserId(userId);
        if (teacherDTO == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.ok(teacherDTO).build();
    }
}

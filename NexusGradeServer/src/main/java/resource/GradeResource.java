package resource;

import dto.GradeDTO;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import repository.GradeRepository;
import repository.StudentRepository;
import repository.SubjectRepository;
import rest.GradeService;

import java.util.List;

@Path("/grades")
public class GradeResource {
    private final GradeService service = new GradeService(new GradeRepository(), new StudentRepository(), new SubjectRepository());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<GradeDTO> getAllGrades() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public GradeDTO getGradeById(@PathParam("id") int id) {
        return service.getById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addGrade(GradeDTO gradeDTO) {
        GradeDTO created = service.create(gradeDTO);
        if (created == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid studentId or subjectId")
                    .build();
        }
        return Response.status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateGrade(@PathParam("id") int id, GradeDTO gradeDTO) {
        GradeDTO updated = service.update(id, gradeDTO);
        if (updated == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid studentId or subjectId")
                    .build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGrade(@PathParam("id") int id) {
        service.delete(id);
        return Response.noContent().build();
    }

    @POST
    @Path("/bulk")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadBulkGrades(List<GradeDTO> grades) {
        for (GradeDTO grade : grades) {
            if (service.create(grade) == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Invalid studentId or subjectId for a grade.")
                        .build();
            }
        }
        return Response.status(Response.Status.CREATED)
                .entity("Grades uploaded successfully.")
                .build();
    }
}

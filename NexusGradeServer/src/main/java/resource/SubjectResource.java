package resource;


import dto.SubjectDTO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;

import jakarta.ws.rs.core.Response;

import repository.SubjectRepository;
import repository.TeacherRepository;
import rest.SubjectService;


@Path("/subjects")
public class SubjectResource {
    private final SubjectService service = new SubjectService(new SubjectRepository(), new TeacherRepository());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<SubjectDTO> getAllSubjects() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public SubjectDTO getSubjectById(@PathParam("id") int id) {
        return service.getById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createSubject(SubjectDTO subjectDTO) {
        SubjectDTO created = service.create(subjectDTO);
        if (created == null) {
            Map<String, String> error = Map.of(
                    "error", "teacherId invalid or not found"
            );
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(error)
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
    public Response updateSubject(@PathParam("id") int id, SubjectDTO subjectDTO) {
        SubjectDTO updated = service.update(id, subjectDTO);
        if (updated == null) {
            Map<String, String> error = Map.of(
                    "error", "teacherId invalid or not found"
            );
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(error)
                    .build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteSubject(@PathParam("id") int id) {
        service.delete(id);
        return Response.noContent().build();
    }
}

package resource;


import dto.SubjectDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

import repository.SubjectRepository;
import rest.SubjectService;


@Path("/subjects")
public class SubjectResource {
    private final SubjectService service = new SubjectService(new SubjectRepository());

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
}

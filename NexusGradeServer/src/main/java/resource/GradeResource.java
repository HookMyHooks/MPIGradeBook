package resource;
import dto.GradeDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import repository.GradeRepository;
import rest.GradeService;

import java.util.List;

@Path("/grades")
public class GradeResource {
    private final GradeService service = new GradeService(new GradeRepository());

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
}
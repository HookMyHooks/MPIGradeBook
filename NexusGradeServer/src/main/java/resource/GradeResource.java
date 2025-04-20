package resource;

import dto.GradeDTO;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import model.Grade;
import repository.GradeRepository;
import repository.StudentRepository;
import repository.SubjectRepository;
import rest.GradeService;

import java.time.LocalDate;
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

    @POST
    @Path("/bulk")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadBulkGrades(List<GradeDTO> grades) {
        GradeRepository gradeRepo = new GradeRepository();
        StudentRepository studentRepo = new StudentRepository();
        SubjectRepository subjectRepo = new SubjectRepository();
    
        for (GradeDTO dto : grades) {
            if (dto.getStudentId() == null || dto.getSubjectId() == null || dto.getValue() == null) {
                continue; // Poți adăuga și logare sau returnare de eroare
            }
    
            Grade g = new Grade();
            g.setValue(dto.getValue());
            g.setDate(LocalDate.now());
    
            g.setStudent(studentRepo.findById(dto.getStudentId()));
            g.setSubject(subjectRepo.findById(dto.getSubjectId()));
    
            gradeRepo.save(g);
        }
    
        return Response.ok("Bulk grades uploaded successfully").build();
    }
    
}

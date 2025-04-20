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
import jakarta.ws.rs.core.Response;
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

    //adauga nota
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addGrade(GradeDTO dto) {
        if (dto.getStudentId() == null || dto.getSubjectId() == null || dto.getValue() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid data").build();
        }

        Grade grade = new Grade();
        grade.setValue(dto.getValue());
        grade.setDate(LocalDate.now());

        grade.setStudent(new StudentRepository().findById(dto.getStudentId()));
        grade.setSubject(new SubjectRepository().findById(dto.getSubjectId()));

        new GradeRepository().save(grade);

        return Response.ok().entity("Grade created successfully").build();
    }
  
    //update nota
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateGrade(@PathParam("id") int id, GradeDTO dto) {
        Grade existing = new GradeRepository().findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Grade not found").build();
        }

        existing.setValue(dto.getValue());
        existing.setDate(LocalDate.now()); // sau păstrezi data originală
        existing.setStudent(new StudentRepository().findById(dto.getStudentId()));
        existing.setSubject(new SubjectRepository().findById(dto.getSubjectId()));

        new GradeRepository().update(existing);

        return Response.ok().entity("Grade updated successfully").build();
    }

    //sterge nota
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGrade(@PathParam("id") int id) {
        Grade existing = new GradeRepository().findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Grade not found").build();
        }

        new GradeRepository().delete(existing);
        return Response.ok().entity("Grade deleted successfully").build();
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
                continue;
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

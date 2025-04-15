package config;

import resource.*;
import jakarta.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/")
public class AppConfig extends ResourceConfig {
    public AppConfig() {
        packages("rest","config","resource");
        register(GradeResource.class);
        register(StudentResource.class);
        register(SubjectResource.class);
        register(TeacherResource.class);
        register(UserResource.class);
        register(CorsFilter.class);
        register(PreflightResource.class);
    }
}

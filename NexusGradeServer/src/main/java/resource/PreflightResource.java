package resource;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/")
public class PreflightResource {

    @OPTIONS
    @Path("{path:.*}")
    public Response handlePreflight(@PathParam("path") String path) {
        return Response.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .build();
    }
}

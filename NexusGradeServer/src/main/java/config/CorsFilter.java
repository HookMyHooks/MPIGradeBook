package config;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;


@Provider
public class CorsFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
            throws IOException {

        String origin = requestContext.getHeaderString("Origin");

        if (origin != null && !origin.isEmpty()) {
            responseContext.getHeaders().putSingle("Access-Control-Allow-Origin", origin);
            responseContext.getHeaders().putSingle("Vary", "Origin");
        } else {
            responseContext.getHeaders().putSingle("Access-Control-Allow-Origin", "*");
        }

        responseContext.getHeaders().putSingle("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        responseContext.getHeaders().putSingle("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        responseContext.getHeaders().putSingle("Access-Control-Allow-Credentials", "true");
    }
}


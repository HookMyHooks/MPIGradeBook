package org.example;

import config.AppConfig;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.server.ResourceConfig;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create the Jetty server on port 8189
        Server server = new Server();

        // Explicitly bind to localhost on port 8189
        ServerConnector connector = new ServerConnector(server);
        connector.setHost("localhost");
        connector.setPort(8189);
        server.addConnector(connector);

        // Load your Jersey config
        ResourceConfig config = new AppConfig(); // This is your @ApplicationPath class

        // Wrap it in a Jersey Servlet
        ServletHolder servletHolder = new ServletHolder(new ServletContainer(config));

        // Create and configure the context handler
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
        context.setContextPath("/");
        context.addServlet(servletHolder, "/api/*");

        // Attach the context to the server
        server.setHandler(context);

        // Start the server
        try {
            server.start();
            System.out.println("✅ Server started at " + server.getURI());
            server.join(); // Keeps server running
        } finally {
            server.destroy();
        }
    }
}

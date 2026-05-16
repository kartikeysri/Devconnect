package com.example.authsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This tells Spring Boot: "If a browser asks for /uploads/image.jpg, 
        // look inside the local 'uploads' folder on the server."
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}

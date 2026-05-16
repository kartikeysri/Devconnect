package com.example.authsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.authsystem.entity")
@EnableJpaRepositories(basePackages = "com.example.authsystem.repository")
public class AuthSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthSystemApplication.class, args);
    }
}

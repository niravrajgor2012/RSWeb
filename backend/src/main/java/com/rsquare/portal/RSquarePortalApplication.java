package com.rsquare.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class RSquarePortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(RSquarePortalApplication.class, args);
    }
}

package com.rsquare.portal.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        // Handle Java 8 date/time types (Instant, LocalDate, etc.)
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // Handle Hibernate lazy-loaded proxies — serialize as null instead of throwing
        Hibernate6Module hibernateModule = new Hibernate6Module();
        hibernateModule.disable(Hibernate6Module.Feature.USE_TRANSIENT_ANNOTATION);
        hibernateModule.enable(Hibernate6Module.Feature.SERIALIZE_IDENTIFIER_FOR_MISSING_EAGER_LOADED_BEANS);
        mapper.registerModule(hibernateModule);

        return mapper;
    }
}

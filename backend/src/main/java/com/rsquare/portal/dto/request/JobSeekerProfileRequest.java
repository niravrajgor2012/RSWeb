package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.List;

public record JobSeekerProfileRequest(
        @NotBlank String fullName,
        @Past LocalDate dob,
        @NotBlank String gender,
        @NotBlank String city,
        @NotBlank String state,
        @NotBlank String qualification,
        @NotBlank String department,
        List<String> skills,
        String experience,
        List<String> preferredJobTypes,
        List<String> preferredLocations,
        List<String> preferredEmployerTypes
) {}

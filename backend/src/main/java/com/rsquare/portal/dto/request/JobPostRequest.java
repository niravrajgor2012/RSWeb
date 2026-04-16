package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record JobPostRequest(
        @NotBlank(message = "Job title is required") String title,
        @NotBlank String role,
        @NotBlank String department,
        @NotBlank String city,
        @NotBlank String state,
        @NotBlank String jobType,
        @NotBlank String qualification,
        @NotBlank String experience,
        @NotBlank String description,
        List<String> skills,
        Long salaryMin,
        Long salaryMax,

        @NotNull @Min(value = 1, message = "Vacancies must be at least 1")
        Integer vacancies,

        @NotNull @Future(message = "Deadline must be in the future")
        LocalDate deadline,

        boolean isFeatured
) {}

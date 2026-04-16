package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record FacultyProfileRequest(
        @NotBlank String fullName,
        @NotBlank String specialization,
        List<String> qualifications,
        String bio
) {}

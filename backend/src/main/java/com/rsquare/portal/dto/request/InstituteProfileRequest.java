package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record InstituteProfileRequest(
        @NotBlank String name,
        @NotBlank String type,
        String affiliatedTo,
        @NotBlank String city,
        @NotBlank String state,
        String website,
        @NotBlank String contactPerson,
        String brief,
        List<String> courses,
        String placementRecord
) {}

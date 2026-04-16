package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;

public record StudentProfileRequest(
        @NotBlank String fullName,
        @NotBlank String institute,
        @NotBlank String course,
        @NotBlank String year
) {}

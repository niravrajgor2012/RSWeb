package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SendOtpRequest(
        @NotBlank(message = "Target (mobile/email) is required")
        String target,

        @NotBlank(message = "targetType is required")
        @Pattern(regexp = "mobile|email", message = "targetType must be 'mobile' or 'email'")
        String targetType
) {}

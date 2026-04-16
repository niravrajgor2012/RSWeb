package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Name is required")
        String name,

        /** Provide email OR mobile (at least one) */
        String email,
        String mobile,

        /**
         * Optional password. If omitted the account is OTP-only.
         * Min 8 characters when provided.
         */
        @Size(min = 8, message = "Password must be at least 8 characters")
        String password,

        @NotBlank(message = "Role is required")
        @Pattern(regexp = "EMPLOYER|JOBSEEKER|INSTITUTE|FACULTY|STUDENT|ADMIN",
                message = "Role must be one of: EMPLOYER, JOBSEEKER, INSTITUTE, FACULTY, STUDENT, ADMIN")
        String role
) {}

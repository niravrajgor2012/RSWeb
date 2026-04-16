package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record VerifyOtpRequest(
        @NotBlank String target,

        @NotBlank
        @Pattern(regexp = "mobile|email")
        String targetType,

        @NotBlank
        @Size(min = 6, max = 6, message = "OTP must be 6 digits")
        @Pattern(regexp = "\\d{6}", message = "OTP must be numeric")
        String otp,

        /** Required only on first-time registration */
        String name,

        /** Required only on first-time registration: EMPLOYER, JOBSEEKER, INSTITUTE, FACULTY, STUDENT */
        String role
) {}

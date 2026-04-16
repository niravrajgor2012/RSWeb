package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ApplicationStatusRequest(
        @NotBlank
        @Pattern(regexp = "Applied|Shortlisted|Interview|Offered|Rejected",
                message = "Invalid status value")
        String status
) {}

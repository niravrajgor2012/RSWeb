package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record EmployerProfileRequest(
        @NotBlank(message = "Company name is required") String companyName,

        @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
                message = "Invalid GSTN format")
        String gstn,

        @NotBlank String companyType,
        String brief,
        String website,
        String address,
        @NotBlank String city,
        @NotBlank String state,

        @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
        String pincode,

        List<String> industryTags,
        Integer yearEstablished
) {}

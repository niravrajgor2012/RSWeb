package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record CourseRequest(
        @NotBlank String title,
        @NotBlank String mode,
        @NotBlank String status,
        @NotBlank String description,
        @NotBlank String duration,
        BigDecimal fees,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotBlank String instructor,
        @Min(1) int seats,
        List<String> tags
) {}

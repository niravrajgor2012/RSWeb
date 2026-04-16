package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CourseRegistrationRequest(
        @NotNull UUID courseId,
        @NotBlank String participantName,
        @NotBlank @Email String participantEmail,
        @NotBlank String participantMobile,
        /** FACULTY | STUDENT | GENERAL */
        @NotBlank String participantType
) {}

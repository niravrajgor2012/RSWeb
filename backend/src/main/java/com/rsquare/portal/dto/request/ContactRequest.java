package com.rsquare.portal.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ContactRequest {

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotBlank
    @Email
    @Size(max = 150)
    private String email;

    @Size(max = 15)
    private String mobile;

    @NotBlank
    private String message;
}

package com.rsquare.portal.dto.response;

import com.rsquare.portal.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
public class AuthResponse {
    private UUID id;
    private String name;
    private String email;
    private String mobile;
    private String role;
    private boolean verified;
    private Instant createdAt;
    private String token;

    public static AuthResponse from(User user, String token) {
        return AuthResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .mobile(user.getMobile())
                .role(user.getRole().name())
                .verified(user.isVerified())
                .createdAt(user.getCreatedAt())
                .token(token)
                .build();
    }
}

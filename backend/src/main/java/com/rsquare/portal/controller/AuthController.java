package com.rsquare.portal.controller;

import com.rsquare.portal.dto.request.*;
import com.rsquare.portal.dto.request.RegisterRequest;
import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.dto.response.AuthResponse;
import com.rsquare.portal.security.JwtTokenProvider;
import com.rsquare.portal.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    /**
     * POST /api/auth/register
     * Direct registration — no OTP. Returns JWT immediately.
     * Body: { name, email?, mobile?, password?, role }
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest req) {
        AuthResponse resp = authService.register(req);
        return ResponseEntity.status(201).body(ApiResponse.ok("Registration successful", resp));
    }

    /** POST /api/auth/otp/send */
    @PostMapping("/otp/send")
    public ResponseEntity<ApiResponse<Void>> sendOtp(@Valid @RequestBody SendOtpRequest req) {
        authService.sendOtp(req);
        return ResponseEntity.ok(ApiResponse.ok("OTP sent successfully"));
    }

    /** POST /api/auth/otp/verify — register new user OR login existing user */
    @PostMapping("/otp/verify")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest req) {
        AuthResponse resp = authService.verifyOtp(req);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", resp));
    }

    /** POST /api/auth/login — password login (admin) */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest req) {
        AuthResponse resp = authService.loginWithPassword(req);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", resp));
    }

    /** PUT /api/auth/change-password — requires JWT */
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody ChangePasswordRequest req) {
        UUID userId = UUID.fromString(principal.getUsername());
        authService.changePassword(userId, req);
        return ResponseEntity.ok(ApiResponse.ok("Password updated"));
    }
}

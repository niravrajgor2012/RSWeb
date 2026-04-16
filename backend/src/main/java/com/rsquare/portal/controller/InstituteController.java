package com.rsquare.portal.controller;

import com.rsquare.portal.dto.request.InstituteProfileRequest;
import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.entity.Institute;
import com.rsquare.portal.service.InstituteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/institute")
@RequiredArgsConstructor
public class InstituteController {

    private final InstituteService instituteService;

    /** GET /api/institute/profile */
    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('INSTITUTE','ADMIN')")
    public ResponseEntity<ApiResponse<Institute>> getProfile(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.ok(
                instituteService.getProfile(currentUserId(principal))));
    }

    /** POST /api/institute/profile */
    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('INSTITUTE','ADMIN')")
    public ResponseEntity<ApiResponse<Institute>> saveProfile(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestPart("profile") InstituteProfileRequest req,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "brochure", required = false) MultipartFile brochure) {
        Institute saved = instituteService.saveProfile(currentUserId(principal), req, logo, brochure);
        return ResponseEntity.ok(ApiResponse.ok("Profile saved", saved));
    }

    private UUID currentUserId(UserDetails p) {
        return UUID.fromString(p.getUsername());
    }
}

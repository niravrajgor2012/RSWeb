package com.rsquare.portal.controller;

import com.rsquare.portal.dto.request.JobSeekerProfileRequest;
import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.dto.response.PagedResponse;
import com.rsquare.portal.entity.JobApplication;
import com.rsquare.portal.entity.JobSeeker;
import com.rsquare.portal.service.JobSeekerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/jobseeker")
@RequiredArgsConstructor
public class JobSeekerController {

    private final JobSeekerService seekerService;

    /** GET /api/jobseeker/profile */
    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('JOBSEEKER','ADMIN')")
    public ResponseEntity<ApiResponse<JobSeeker>> getProfile(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.ok(
                seekerService.getProfile(currentUserId(principal))));
    }

    /** POST /api/jobseeker/profile  (multipart: profile JSON + cv + photo) */
    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('JOBSEEKER','ADMIN')")
    public ResponseEntity<ApiResponse<JobSeeker>> saveProfile(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestPart("profile") JobSeekerProfileRequest req,
            @RequestPart(value = "cv", required = false) MultipartFile cv,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        JobSeeker saved = seekerService.saveProfile(currentUserId(principal), req, cv, photo);
        return ResponseEntity.ok(ApiResponse.ok("Profile saved", saved));
    }

    /** POST /api/jobseeker/apply/{jobId} */
    @PostMapping("/apply/{jobId}")
    @PreAuthorize("hasAnyRole('JOBSEEKER','ADMIN')")
    public ResponseEntity<ApiResponse<JobApplication>> applyForJob(
            @AuthenticationPrincipal UserDetails principal,
            @PathVariable UUID jobId) {
        JobApplication application = seekerService.applyForJob(currentUserId(principal), jobId);
        return ResponseEntity.ok(ApiResponse.ok("Application submitted", application));
    }

    /** GET /api/jobseeker/applications */
    @GetMapping("/applications")
    @PreAuthorize("hasAnyRole('JOBSEEKER','ADMIN')")
    public ResponseEntity<ApiResponse<List<JobApplication>>> getMyApplications(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.ok(
                seekerService.getMyApplications(currentUserId(principal))));
    }

    /**
     * GET /api/jobseeker/candidates — Employer CV search
     * (Accessible to EMPLOYER and ADMIN only)
     */
    @GetMapping("/candidates")
    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    public ResponseEntity<ApiResponse<PagedResponse<JobSeeker>>> searchCandidates(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, Math.min(size, 50));
        Page<JobSeeker> result = seekerService.searchCandidates(pageable);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(result)));
    }

    private UUID currentUserId(UserDetails p) {
        return UUID.fromString(p.getUsername());
    }
}

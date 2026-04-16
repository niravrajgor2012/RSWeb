package com.rsquare.portal.controller;

import com.rsquare.portal.dto.request.EmployerProfileRequest;
import com.rsquare.portal.dto.request.JobPostRequest;
import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.entity.Employer;
import com.rsquare.portal.entity.JobPost;
import com.rsquare.portal.service.EmployerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/api/employer")
@PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
@RequiredArgsConstructor
public class EmployerController {

    private final EmployerService employerService;

    /** GET /api/employer/profile */
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Employer>> getProfile(
            @AuthenticationPrincipal UserDetails principal) {
        Employer profile = employerService.getProfile(currentUserId(principal));
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    /** POST /api/employer/profile  (multipart: profile JSON + logo file) */
    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Employer>> saveProfile(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestPart("profile") EmployerProfileRequest req,
            @RequestPart(value = "logo", required = false) MultipartFile logo) {
        Employer saved = employerService.saveProfile(currentUserId(principal), req, logo);
        return ResponseEntity.ok(ApiResponse.ok("Profile saved", saved));
    }

    /** GET /api/employer/jobs — employer's own job posts */
    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobPost>>> getMyJobs(
            @AuthenticationPrincipal UserDetails principal) {
        List<JobPost> jobs = employerService.getMyJobs(currentUserId(principal));
        return ResponseEntity.ok(ApiResponse.ok(jobs));
    }

    /** POST /api/employer/jobs */
    @PostMapping("/jobs")
    public ResponseEntity<ApiResponse<JobPost>> postJob(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody JobPostRequest req) {
        JobPost job = employerService.postJob(currentUserId(principal), req);
        return ResponseEntity.ok(ApiResponse.ok("Job posted", job));
    }

    /** PUT /api/employer/jobs/{id} */
    @PutMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobPost>> updateJob(
            @AuthenticationPrincipal UserDetails principal,
            @PathVariable UUID id,
            @Valid @RequestBody JobPostRequest req) {
        JobPost job = employerService.updateJob(currentUserId(principal), id, req);
        return ResponseEntity.ok(ApiResponse.ok("Job updated", job));
    }

    /** DELETE /api/employer/jobs/{id} — soft delete (sets isActive=false) */
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @AuthenticationPrincipal UserDetails principal,
            @PathVariable UUID id) {
        employerService.deleteJob(currentUserId(principal), id);
        return ResponseEntity.ok(ApiResponse.ok("Job deactivated"));
    }

    private UUID currentUserId(UserDetails p) {
        return UUID.fromString(p.getUsername());
    }
}

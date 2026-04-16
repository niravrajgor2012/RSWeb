package com.rsquare.portal.controller;

import com.rsquare.portal.dto.request.*;
import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.entity.*;
import com.rsquare.portal.service.TrainingService;
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
@RequestMapping("/api/training")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;

    // ── Courses (public read) ─────────────────────────────────────────────────

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<Course>>> getCourses(
            @RequestParam(required = false) String mode) {
        List<Course> courses = mode != null
                ? trainingService.getCoursesByMode(mode)
                : trainingService.getAllCourses();
        return ResponseEntity.ok(ApiResponse.ok(courses));
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Course>> getCourse(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(trainingService.getCourse(id)));
    }

    /** POST /api/training/courses — admin/faculty only */
    @PostMapping(value = "/courses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<Course>> createCourse(
            @Valid @RequestPart("course") CourseRequest req,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart(value = "brochure", required = false) MultipartFile brochure) {
        Course created = trainingService.createCourse(req, image, brochure);
        return ResponseEntity.ok(ApiResponse.ok("Course created", created));
    }

    /** POST /api/training/courses/register — public (any authenticated user) */
    @PostMapping("/courses/register")
    public ResponseEntity<ApiResponse<CourseRegistration>> register(
            @Valid @RequestBody CourseRegistrationRequest req) {
        CourseRegistration reg = trainingService.registerForCourse(req);
        return ResponseEntity.ok(ApiResponse.ok("Registration successful", reg));
    }

    // ── Faculty ───────────────────────────────────────────────────────────────

    @GetMapping("/faculty/profile")
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<Faculty>> getFacultyProfile(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.ok(
                trainingService.getFacultyProfile(currentUserId(principal))));
    }

    @PostMapping(value = "/faculty/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<Faculty>> saveFacultyProfile(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestPart("profile") FacultyProfileRequest req,
            @RequestPart(value = "cv", required = false) MultipartFile cv) {
        Faculty saved = trainingService.saveFacultyProfile(currentUserId(principal), req, cv);
        return ResponseEntity.ok(ApiResponse.ok("Profile saved", saved));
    }

    // ── Student ───────────────────────────────────────────────────────────────

    @GetMapping("/student/profile")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<ApiResponse<Student>> getStudentProfile(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.ok(
                trainingService.getStudentProfile(currentUserId(principal))));
    }

    @PostMapping(value = "/student/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<ApiResponse<Student>> saveStudentProfile(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestPart("profile") StudentProfileRequest req,
            @RequestPart(value = "cv", required = false) MultipartFile cv) {
        Student saved = trainingService.saveStudentProfile(currentUserId(principal), req, cv);
        return ResponseEntity.ok(ApiResponse.ok("Profile saved", saved));
    }

    private UUID currentUserId(UserDetails p) {
        return UUID.fromString(p.getUsername());
    }
}

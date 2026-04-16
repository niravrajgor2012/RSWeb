package com.rsquare.portal.controller;

import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.dto.response.PagedResponse;
import com.rsquare.portal.entity.JobPost;
import com.rsquare.portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    /**
     * GET /api/jobs
     * Params: q, type, city, department, skill, employerType, company, page, size, sort
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<JobPost>>> searchJobs(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String employerType,
            @RequestParam(required = false) String company,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        size = Math.min(size, 50); // cap page size
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedAt").descending());
        Page<JobPost> result = jobService.searchJobs(q, type, city, department,
                skill, employerType, company, pageable);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(result)));
    }

    /** GET /api/jobs/featured */
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<JobPost>>> getFeaturedJobs() {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getFeatured()));
    }

    /** GET /api/jobs/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobPost>> getJob(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getById(id)));
    }
}

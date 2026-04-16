package com.rsquare.portal.controller;

import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.entity.Client;
import com.rsquare.portal.entity.RecruitmentPackage;
import com.rsquare.portal.repository.ClientRepository;
import com.rsquare.portal.repository.RecruitmentPackageRepository;
import com.rsquare.portal.repository.UserRepository;
import com.rsquare.portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ClientRepository clientRepo;
    private final RecruitmentPackageRepository packageRepo;
    private final UserRepository userRepo;
    private final JobService jobService;

    /** GET /api/public/clients */
    @GetMapping("/clients")
    public ResponseEntity<ApiResponse<List<Client>>> getClients() {
        return ResponseEntity.ok(ApiResponse.ok(clientRepo.findAllByOrderByNameAsc()));
    }

    /** GET /api/public/packages */
    @GetMapping("/packages")
    public ResponseEntity<ApiResponse<List<RecruitmentPackage>>> getPackages() {
        return ResponseEntity.ok(ApiResponse.ok(packageRepo.findAllByOrderByPriceAsc()));
    }

    /** GET /api/public/stats — homepage counters */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        Map<String, Long> stats = Map.of(
                "activeJobs", jobService.countActive(),
                "employers", userRepo.countByRole(com.rsquare.portal.entity.UserRole.EMPLOYER),
                "jobSeekers", userRepo.countByRole(com.rsquare.portal.entity.UserRole.JOBSEEKER),
                "institutes", userRepo.countByRole(com.rsquare.portal.entity.UserRole.INSTITUTE)
        );
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}

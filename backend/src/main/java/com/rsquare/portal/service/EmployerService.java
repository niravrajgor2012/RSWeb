package com.rsquare.portal.service;

import com.rsquare.portal.dto.request.EmployerProfileRequest;
import com.rsquare.portal.dto.request.JobPostRequest;
import com.rsquare.portal.entity.*;
import com.rsquare.portal.exception.BadRequestException;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.exception.UnauthorizedException;
import com.rsquare.portal.repository.EmployerRepository;
import com.rsquare.portal.repository.JobPostRepository;
import com.rsquare.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployerService {

    private final UserRepository userRepo;
    private final EmployerRepository employerRepo;
    private final JobPostRepository jobPostRepo;
    private final FileStorageService fileStorage;

    @Transactional(readOnly = true)
    public Employer getProfile(UUID userId) {
        return employerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));
    }

    @Transactional
    public Employer saveProfile(UUID userId, EmployerProfileRequest req, MultipartFile logo) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (req.gstn() != null &&
                employerRepo.existsByGstn(req.gstn()) &&
                employerRepo.findByUserId(userId)
                        .map(e -> !req.gstn().equals(e.getGstn())).orElse(true)) {
            throw new BadRequestException("GSTN already registered.");
        }

        Employer employer = employerRepo.findByUserId(userId).orElse(Employer.builder().user(user).build());

        employer.setCompanyName(req.companyName());
        employer.setGstn(req.gstn());
        employer.setCompanyType(req.companyType());
        employer.setBrief(req.brief());
        employer.setWebsite(req.website());
        employer.setAddress(req.address());
        employer.setCity(req.city());
        employer.setState(req.state());
        employer.setPincode(req.pincode());
        if (req.industryTags() != null) employer.setIndustryTags(req.industryTags());
        if (req.yearEstablished() != null) employer.setYearEstablished(req.yearEstablished());

        if (logo != null && !logo.isEmpty()) {
            if (employer.getLogoUrl() != null) fileStorage.delete(employer.getLogoUrl());
            employer.setLogoUrl(fileStorage.storeImage(logo, "logos"));
        }

        return employerRepo.save(employer);
    }

    @Transactional
    public JobPost postJob(UUID userId, JobPostRequest req) {
        Employer employer = employerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Complete your employer profile first."));

        JobPost job = JobPost.builder()
                .employer(employer)
                .companyName(employer.getCompanyName())
                .companyLogoUrl(employer.getLogoUrl())
                .employerType("Direct")
                .title(req.title())
                .role(req.role())
                .department(req.department())
                .city(req.city())
                .state(req.state())
                .jobType(req.jobType())
                .qualification(req.qualification())
                .experience(req.experience())
                .description(req.description())
                .skills(req.skills() != null ? req.skills() : List.of())
                .salaryMin(req.salaryMin())
                .salaryMax(req.salaryMax())
                .vacancies(req.vacancies())
                .deadline(req.deadline())
                .postedAt(LocalDate.now())
                .isFeatured(req.isFeatured())
                .isActive(true)
                .build();

        return jobPostRepo.save(job);
    }

    @Transactional
    public JobPost updateJob(UUID userId, UUID jobId, JobPostRequest req) {
        JobPost job = getOwnedJob(userId, jobId);

        job.setTitle(req.title());
        job.setRole(req.role());
        job.setDepartment(req.department());
        job.setCity(req.city());
        job.setState(req.state());
        job.setJobType(req.jobType());
        job.setQualification(req.qualification());
        job.setExperience(req.experience());
        job.setDescription(req.description());
        if (req.skills() != null) job.setSkills(req.skills());
        job.setSalaryMin(req.salaryMin());
        job.setSalaryMax(req.salaryMax());
        job.setVacancies(req.vacancies());
        job.setDeadline(req.deadline());
        job.setFeatured(req.isFeatured());

        return jobPostRepo.save(job);
    }

    @Transactional
    public void deleteJob(UUID userId, UUID jobId) {
        JobPost job = getOwnedJob(userId, jobId);
        job.setActive(false);
        jobPostRepo.save(job);
    }

    @Transactional(readOnly = true)
    public List<JobPost> getMyJobs(UUID userId) {
        Employer employer = employerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));
        return jobPostRepo.findByEmployer(employer);
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private JobPost getOwnedJob(UUID userId, UUID jobId) {
        Employer employer = employerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));
        JobPost job = jobPostRepo.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));
        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new UnauthorizedException("You do not own this job posting.");
        }
        return job;
    }
}

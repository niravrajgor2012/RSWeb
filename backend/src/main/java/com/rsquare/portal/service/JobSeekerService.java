package com.rsquare.portal.service;

import com.rsquare.portal.dto.request.JobSeekerProfileRequest;
import com.rsquare.portal.entity.*;
import com.rsquare.portal.exception.BadRequestException;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobSeekerService {

    private final UserRepository userRepo;
    private final JobSeekerRepository seekerRepo;
    private final JobPostRepository jobPostRepo;
    private final JobApplicationRepository applicationRepo;
    private final FileStorageService fileStorage;

    @Transactional(readOnly = true)
    public JobSeeker getProfile(UUID userId) {
        return seekerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker profile not found"));
    }

    @Transactional
    public JobSeeker saveProfile(UUID userId, JobSeekerProfileRequest req,
                                 MultipartFile cv, MultipartFile photo) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        JobSeeker seeker = seekerRepo.findByUserId(userId)
                .orElse(JobSeeker.builder().user(user).build());

        seeker.setFullName(req.fullName());
        seeker.setDob(req.dob());
        seeker.setGender(req.gender());
        seeker.setCity(req.city());
        seeker.setState(req.state());
        seeker.setQualification(req.qualification());
        seeker.setDepartment(req.department());
        seeker.setExperience(req.experience());
        if (req.skills() != null) seeker.setSkills(req.skills());
        if (req.preferredJobTypes() != null) seeker.setPreferredJobTypes(req.preferredJobTypes());
        if (req.preferredLocations() != null) seeker.setPreferredLocations(req.preferredLocations());
        if (req.preferredEmployerTypes() != null) seeker.setPreferredEmployerTypes(req.preferredEmployerTypes());

        if (cv != null && !cv.isEmpty()) {
            if (seeker.getCvUrl() != null) fileStorage.delete(seeker.getCvUrl());
            seeker.setCvUrl(fileStorage.storeDocument(cv, "cvs"));
        }
        if (photo != null && !photo.isEmpty()) {
            if (seeker.getPhotoUrl() != null) fileStorage.delete(seeker.getPhotoUrl());
            seeker.setPhotoUrl(fileStorage.storeImage(photo, "photos"));
        }

        seeker.setProfileComplete(calculateCompleteness(seeker));
        return seekerRepo.save(seeker);
    }

    @Transactional
    public JobApplication applyForJob(UUID userId, UUID jobId) {
        JobSeeker seeker = seekerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Complete your profile before applying."));
        JobPost job = jobPostRepo.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));

        if (!job.isActive()) {
            throw new BadRequestException("This job posting is no longer active.");
        }
        if (applicationRepo.existsByJobPostAndJobSeeker(job, seeker)) {
            throw new BadRequestException("You have already applied for this job.");
        }

        return applicationRepo.save(JobApplication.builder()
                .jobPost(job)
                .jobSeeker(seeker)
                .build());
    }

    @Transactional(readOnly = true)
    public List<JobApplication> getMyApplications(UUID userId) {
        JobSeeker seeker = seekerRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return applicationRepo.findByJobSeeker(seeker);
    }

    /** Employer: search CVs */
    @Transactional(readOnly = true)
    public Page<JobSeeker> searchCandidates(Pageable pageable) {
        return seekerRepo.findAll(pageable);
    }

    // ── private helpers ───────────────────────────────────────────────────────

    private int calculateCompleteness(JobSeeker s) {
        int score = 0;
        if (s.getFullName() != null) score += 15;
        if (s.getDob() != null) score += 5;
        if (s.getGender() != null) score += 5;
        if (s.getCity() != null && s.getState() != null) score += 10;
        if (s.getQualification() != null) score += 15;
        if (!s.getSkills().isEmpty()) score += 15;
        if (s.getExperience() != null) score += 10;
        if (s.getCvUrl() != null) score += 15;
        if (s.getPhotoUrl() != null) score += 10;
        return Math.min(score, 100);
    }
}

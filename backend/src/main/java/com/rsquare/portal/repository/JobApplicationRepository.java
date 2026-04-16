package com.rsquare.portal.repository;

import com.rsquare.portal.entity.JobApplication;
import com.rsquare.portal.entity.JobPost;
import com.rsquare.portal.entity.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    List<JobApplication> findByJobSeeker(JobSeeker jobSeeker);
    List<JobApplication> findByJobPost(JobPost jobPost);
    Optional<JobApplication> findByJobPostAndJobSeeker(JobPost jobPost, JobSeeker jobSeeker);
    boolean existsByJobPostAndJobSeeker(JobPost jobPost, JobSeeker jobSeeker);
    long countByJobPost(JobPost jobPost);
}

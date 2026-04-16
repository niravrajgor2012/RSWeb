package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Employer;
import com.rsquare.portal.entity.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface JobPostRepository extends JpaRepository<JobPost, UUID>,
        JpaSpecificationExecutor<JobPost> {

    Page<JobPost> findByIsActiveTrue(Pageable pageable);
    List<JobPost> findByEmployer(Employer employer);
    List<JobPost> findByIsFeaturedTrueAndIsActiveTrue();
    long countByIsActiveTrue();
}

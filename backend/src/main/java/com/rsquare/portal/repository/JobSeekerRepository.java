package com.rsquare.portal.repository;

import com.rsquare.portal.entity.JobSeeker;
import com.rsquare.portal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, UUID>,
        JpaSpecificationExecutor<JobSeeker> {

    Optional<JobSeeker> findByUser(User user);
    Optional<JobSeeker> findByUserId(UUID userId);
    Page<JobSeeker> findAll(Pageable pageable);
}

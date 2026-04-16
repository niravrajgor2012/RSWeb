package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Employer;
import com.rsquare.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
    Optional<Employer> findByUser(User user);
    Optional<Employer> findByUserId(UUID userId);
    boolean existsByGstn(String gstn);
}

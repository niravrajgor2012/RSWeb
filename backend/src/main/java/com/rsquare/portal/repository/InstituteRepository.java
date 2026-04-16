package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Institute;
import com.rsquare.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface InstituteRepository extends JpaRepository<Institute, UUID> {
    Optional<Institute> findByUser(User user);
    Optional<Institute> findByUserId(UUID userId);
}

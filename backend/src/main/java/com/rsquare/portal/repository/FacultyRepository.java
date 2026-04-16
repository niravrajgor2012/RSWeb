package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Faculty;
import com.rsquare.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FacultyRepository extends JpaRepository<Faculty, UUID> {
    Optional<Faculty> findByUser(User user);
    Optional<Faculty> findByUserId(UUID userId);
}

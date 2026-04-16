package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Student;
import com.rsquare.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {
    Optional<Student> findByUser(User user);
    Optional<Student> findByUserId(UUID userId);
}

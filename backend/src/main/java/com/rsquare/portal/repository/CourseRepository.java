package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByMode(String mode);
    List<Course> findByStatus(String status);
    List<Course> findByModeAndStatus(String mode, String status);
}

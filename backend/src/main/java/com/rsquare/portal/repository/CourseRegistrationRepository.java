package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Course;
import com.rsquare.portal.entity.CourseRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CourseRegistrationRepository extends JpaRepository<CourseRegistration, UUID> {
    List<CourseRegistration> findByCourse(Course course);
    boolean existsByCourseAndParticipantEmail(Course course, String email);
    long countByCourse(Course course);
}

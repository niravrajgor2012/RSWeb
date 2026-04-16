package com.rsquare.portal.service;

import com.rsquare.portal.dto.request.CourseRegistrationRequest;
import com.rsquare.portal.dto.request.CourseRequest;
import com.rsquare.portal.dto.request.FacultyProfileRequest;
import com.rsquare.portal.dto.request.StudentProfileRequest;
import com.rsquare.portal.entity.*;
import com.rsquare.portal.exception.BadRequestException;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrainingService {

    private final UserRepository userRepo;
    private final CourseRepository courseRepo;
    private final CourseRegistrationRepository registrationRepo;
    private final FacultyRepository facultyRepo;
    private final StudentRepository studentRepo;
    private final FileStorageService fileStorage;

    // ── Courses ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @Transactional(readOnly = true)
    public List<Course> getCoursesByMode(String mode) {
        return courseRepo.findByMode(mode);
    }

    @Transactional(readOnly = true)
    public Course getCourse(UUID id) {
        return courseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
    }

    @Transactional
    public Course createCourse(CourseRequest req, MultipartFile image, MultipartFile brochure) {
        Course course = Course.builder()
                .title(req.title())
                .mode(req.mode())
                .status(req.status())
                .description(req.description())
                .duration(req.duration())
                .fees(req.fees())
                .startDate(req.startDate())
                .endDate(req.endDate())
                .instructor(req.instructor())
                .seats(req.seats())
                .seatsRemaining(req.seats())
                .tags(req.tags() != null ? req.tags() : List.of())
                .build();

        if (image != null && !image.isEmpty())
            course.setImageUrl(fileStorage.storeImage(image, "course-images"));
        if (brochure != null && !brochure.isEmpty())
            course.setBrochureUrl(fileStorage.storeDocument(brochure, "brochures"));

        return courseRepo.save(course);
    }

    @Transactional
    public CourseRegistration registerForCourse(CourseRegistrationRequest req) {
        Course course = courseRepo.findById(req.courseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", req.courseId()));

        if (course.getSeatsRemaining() <= 0) {
            throw new BadRequestException("No seats available for this course.");
        }
        if (registrationRepo.existsByCourseAndParticipantEmail(course, req.participantEmail())) {
            throw new BadRequestException("You are already registered for this course.");
        }

        course.setSeatsRemaining(course.getSeatsRemaining() - 1);
        courseRepo.save(course);

        return registrationRepo.save(CourseRegistration.builder()
                .course(course)
                .participantName(req.participantName())
                .participantEmail(req.participantEmail())
                .participantMobile(req.participantMobile())
                .participantType(req.participantType())
                .build());
    }

    // ── Faculty ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Faculty getFacultyProfile(UUID userId) {
        return facultyRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty profile not found"));
    }

    @Transactional
    public Faculty saveFacultyProfile(UUID userId, FacultyProfileRequest req, MultipartFile cv) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Faculty faculty = facultyRepo.findByUserId(userId)
                .orElse(Faculty.builder().user(user).build());

        faculty.setFullName(req.fullName());
        faculty.setSpecialization(req.specialization());
        if (req.qualifications() != null) faculty.setQualifications(req.qualifications());
        faculty.setBio(req.bio());

        if (cv != null && !cv.isEmpty()) {
            if (faculty.getCvUrl() != null) fileStorage.delete(faculty.getCvUrl());
            faculty.setCvUrl(fileStorage.storeDocument(cv, "cvs"));
        }

        return facultyRepo.save(faculty);
    }

    // ── Student ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Student getStudentProfile(UUID userId) {
        return studentRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
    }

    @Transactional
    public Student saveStudentProfile(UUID userId, StudentProfileRequest req, MultipartFile cv) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Student student = studentRepo.findByUserId(userId)
                .orElse(Student.builder().user(user).build());

        student.setFullName(req.fullName());
        student.setInstitute(req.institute());
        student.setCourse(req.course());
        student.setYear(req.year());

        if (cv != null && !cv.isEmpty()) {
            if (student.getCvUrl() != null) fileStorage.delete(student.getCvUrl());
            student.setCvUrl(fileStorage.storeDocument(cv, "cvs"));
        }

        return studentRepo.save(student);
    }
}

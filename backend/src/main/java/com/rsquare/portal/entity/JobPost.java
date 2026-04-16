package com.rsquare.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "job_posts", indexes = {
        @Index(name = "idx_job_active", columnList = "is_active"),
        @Index(name = "idx_job_city", columnList = "city"),
        @Index(name = "idx_job_type", columnList = "job_type"),
        @Index(name = "idx_job_dept", columnList = "department"),
        @Index(name = "idx_job_employer", columnList = "employer_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(name = "company_logo_url")
    private String companyLogoUrl;

    @Column(name = "employer_type", nullable = false, length = 20)
    private String employerType;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 100)
    private String role;

    @Column(length = 100)
    private String department;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(name = "job_type", nullable = false, length = 30)
    private String jobType;

    @Column(length = 200)
    private String qualification;

    @Column(length = 100)
    private String experience;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_post_skills",
            joinColumns = @JoinColumn(name = "job_post_id"))
    @Column(name = "skill", length = 100)
    @Builder.Default
    private List<String> skills = new ArrayList<>();

    @Column(name = "salary_min")
    private Long salaryMin;

    @Column(name = "salary_max")
    private Long salaryMax;

    @Column(nullable = false)
    @Builder.Default
    private int vacancies = 1;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(name = "posted_at", nullable = false)
    private LocalDate postedAt;

    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private boolean isFeatured = false;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private boolean isActive = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

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
@Table(name = "job_seekers")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class JobSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    private LocalDate dob;

    @Column(length = 10)
    private String gender;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 200)
    private String qualification;

    @Column(length = 100)
    private String department;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_seeker_skills",
            joinColumns = @JoinColumn(name = "job_seeker_id"))
    @Column(name = "skill", length = 100)
    @Builder.Default
    private List<String> skills = new ArrayList<>();

    @Column(length = 100)
    private String experience;

    @Column(name = "cv_url")
    private String cvUrl;

    @Column(name = "photo_url")
    private String photoUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_seeker_pref_job_types",
            joinColumns = @JoinColumn(name = "job_seeker_id"))
    @Column(name = "job_type", length = 30)
    @Builder.Default
    private List<String> preferredJobTypes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_seeker_pref_locations",
            joinColumns = @JoinColumn(name = "job_seeker_id"))
    @Column(name = "location", length = 100)
    @Builder.Default
    private List<String> preferredLocations = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_seeker_pref_employer_types",
            joinColumns = @JoinColumn(name = "job_seeker_id"))
    @Column(name = "employer_type", length = 20)
    @Builder.Default
    private List<String> preferredEmployerTypes = new ArrayList<>();

    @Column(name = "profile_complete", nullable = false)
    @Builder.Default
    private int profileComplete = 0;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

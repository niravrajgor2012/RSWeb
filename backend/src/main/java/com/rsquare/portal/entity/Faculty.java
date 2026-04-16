package com.rsquare.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "faculties")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(length = 200)
    private String specialization;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "faculty_qualifications",
            joinColumns = @JoinColumn(name = "faculty_id"))
    @Column(name = "qualification", length = 200)
    @Builder.Default
    private List<String> qualifications = new ArrayList<>();

    @Column(name = "cv_url")
    private String cvUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

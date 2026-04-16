package com.rsquare.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "job_applications", uniqueConstraints = {
        @UniqueConstraint(name = "uq_application", columnNames = {"job_post_id", "job_seeker_id"})
}, indexes = {
        @Index(name = "idx_app_job", columnList = "job_post_id"),
        @Index(name = "idx_app_seeker", columnList = "job_seeker_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_post_id", nullable = false)
    private JobPost jobPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_seeker_id", nullable = false)
    private JobSeeker jobSeeker;

    @Column(name = "applied_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant appliedAt;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "Applied";
}

package com.rsquare.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recruitment_packages")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecruitmentPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "package_features",
            joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "feature", length = 300)
    @Builder.Default
    private List<String> features = new ArrayList<>();

    @Column(name = "job_post_limit", nullable = false)
    private int jobPostLimit;

    @Column(name = "resume_search_limit", nullable = false)
    private int resumeSearchLimit;

    @Column(name = "featured_job_slots", nullable = false)
    private int featuredJobSlots;

    @Column(name = "validity_days", nullable = false)
    private int validityDays;

    @Column(name = "is_popular", nullable = false)
    @Builder.Default
    private boolean isPopular = false;

    @Column(name = "is_custom", nullable = false)
    @Builder.Default
    private boolean isCustom = false;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;
}

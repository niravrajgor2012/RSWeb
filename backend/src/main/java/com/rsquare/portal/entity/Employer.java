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
@Table(name = "employers")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(length = 15)
    private String gstn;

    @Column(name = "company_type", length = 50)
    private String companyType;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(columnDefinition = "TEXT")
    private String brief;

    @Column(length = 200)
    private String website;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 6)
    private String pincode;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "employer_industry_tags",
            joinColumns = @JoinColumn(name = "employer_id"))
    @Column(name = "tag", length = 100)
    @Builder.Default
    private List<String> industryTags = new ArrayList<>();

    @Column(nullable = false)
    @Builder.Default
    private boolean verified = false;

    @Column(name = "year_established")
    private Integer yearEstablished;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

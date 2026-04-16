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
@Table(name = "institutes")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Institute {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 50)
    private String type;

    @Column(name = "affiliated_to", length = 200)
    private String affiliatedTo;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 200)
    private String website;

    @Column(name = "contact_person", length = 150)
    private String contactPerson;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "brochure_url")
    private String brochureUrl;

    @Column(columnDefinition = "TEXT")
    private String brief;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "institute_courses",
            joinColumns = @JoinColumn(name = "institute_id"))
    @Column(name = "course_name", length = 200)
    @Builder.Default
    private List<String> courses = new ArrayList<>();

    @Column(name = "placement_record", columnDefinition = "TEXT")
    private String placementRecord;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

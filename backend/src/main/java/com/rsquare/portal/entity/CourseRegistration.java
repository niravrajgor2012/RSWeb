package com.rsquare.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "course_registrations")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "participant_name", nullable = false, length = 150)
    private String participantName;

    @Column(name = "participant_email", nullable = false, length = 150)
    private String participantEmail;

    @Column(name = "participant_mobile", length = 15)
    private String participantMobile;

    /** FACULTY | STUDENT | GENERAL */
    @Column(name = "participant_type", nullable = false, length = 20)
    private String participantType;

    @Column(name = "payment_status", nullable = false, length = 20)
    @Builder.Default
    private String paymentStatus = "PENDING";

    @CreatedDate
    @Column(name = "registered_at", updatable = false, nullable = false)
    private Instant registeredAt;
}

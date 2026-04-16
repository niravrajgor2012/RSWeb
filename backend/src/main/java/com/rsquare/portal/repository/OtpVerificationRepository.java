package com.rsquare.portal.repository;

import com.rsquare.portal.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, UUID> {

    Optional<OtpVerification> findTopByTargetAndTargetTypeAndUsedFalseOrderByCreatedAtDesc(
            String target, String targetType);

    @Modifying
    @Query("UPDATE OtpVerification o SET o.used = true WHERE o.target = :target AND o.targetType = :targetType")
    void invalidateAll(String target, String targetType);

    @Modifying
    @Query("DELETE FROM OtpVerification o WHERE o.expiresAt < :cutoff")
    void deleteExpired(Instant cutoff);
}

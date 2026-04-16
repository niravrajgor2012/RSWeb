package com.rsquare.portal.service;

import com.rsquare.portal.entity.OtpVerification;
import com.rsquare.portal.exception.BadRequestException;
import com.rsquare.portal.repository.OtpVerificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpVerificationRepository otpRepo;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.otp.expiry-seconds:300}")
    private int otpExpirySeconds;

    @Value("${app.otp.max-attempts:3}")
    private int maxAttempts;

    /** When true: send always succeeds, verify accepts any 6-digit code */
    @Value("${app.otp.bypass:false}")
    private boolean bypass;

    private static final String BYPASS_CODE = "000000";

    // ── Send ─────────────────────────────────────────────────────────────────

    @Transactional
    public String generateAndSave(String target, String targetType) {
        if (bypass) {
            log.warn("[OTP-BYPASS] OTP verification is BYPASSED. Use code {} for {}", BYPASS_CODE, target);
            return BYPASS_CODE;
        }

        // Invalidate existing OTPs for this target
        otpRepo.invalidateAll(target, targetType);

        String code = String.format("%06d", secureRandom.nextInt(1_000_000));
        otpRepo.save(OtpVerification.builder()
                .target(target)
                .targetType(targetType)
                .code(code)
                .expiresAt(Instant.now().plusSeconds(otpExpirySeconds))
                .build());

        // TODO: replace with real SMS/email gateway when purchased
        log.info("[OTP-STUB] OTP for {} ({}): {}", target, targetType, code);
        return code;
    }

    // ── Verify ────────────────────────────────────────────────────────────────

    @Transactional
    public void verify(String target, String targetType, String submittedCode) {
        if (bypass) {
            // Accept any 6-digit numeric code — no DB check needed
            if (submittedCode == null || !submittedCode.matches("\\d{6}")) {
                throw new BadRequestException("OTP must be 6 digits.");
            }
            log.warn("[OTP-BYPASS] OTP check skipped for {} — accepted code {}", target, submittedCode);
            return;
        }

        OtpVerification otp = otpRepo
                .findTopByTargetAndTargetTypeAndUsedFalseOrderByCreatedAtDesc(target, targetType)
                .orElseThrow(() -> new BadRequestException("No active OTP found. Please request a new one."));

        if (otp.getExpiresAt().isBefore(Instant.now())) {
            otp.setUsed(true);
            otpRepo.save(otp);
            throw new BadRequestException("OTP has expired. Please request a new one.");
        }

        if (otp.getAttempts() >= maxAttempts) {
            otp.setUsed(true);
            otpRepo.save(otp);
            throw new BadRequestException("Too many failed attempts. Please request a new OTP.");
        }

        if (!otp.getCode().equals(submittedCode)) {
            otp.setAttempts(otp.getAttempts() + 1);
            otpRepo.save(otp);
            int remaining = maxAttempts - otp.getAttempts();
            throw new BadRequestException("Invalid OTP. " + remaining + " attempt(s) remaining.");
        }

        otp.setUsed(true);
        otpRepo.save(otp);
    }
}

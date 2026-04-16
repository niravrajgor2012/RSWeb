package com.rsquare.portal.service;

import com.rsquare.portal.dto.request.ChangePasswordRequest;
import com.rsquare.portal.dto.request.LoginRequest;
import com.rsquare.portal.dto.request.RegisterRequest;
import com.rsquare.portal.dto.request.SendOtpRequest;
import com.rsquare.portal.dto.request.VerifyOtpRequest;
import com.rsquare.portal.dto.response.AuthResponse;
import com.rsquare.portal.entity.User;
import com.rsquare.portal.entity.UserRole;
import com.rsquare.portal.exception.BadRequestException;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.exception.UnauthorizedException;
import com.rsquare.portal.repository.UserRepository;
import com.rsquare.portal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final OtpService otpService;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    /** Step 1: send OTP to mobile or email */
    public void sendOtp(SendOtpRequest req) {
        otpService.generateAndSave(req.target(), req.targetType());
    }

    /**
     * Step 2: verify OTP.
     * - If user does not exist and name+role supplied → register new user.
     * - If user exists → log in.
     */
    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest req) {
        otpService.verify(req.target(), req.targetType(), req.otp());

        User user = findExistingUser(req.target(), req.targetType());

        if (user == null) {
            // New user registration
            if (!StringUtils.hasText(req.name()) || !StringUtils.hasText(req.role())) {
                throw new BadRequestException(
                    "New user: 'name' and 'role' are required for registration.");
            }
            UserRole role = parseRole(req.role());
            user = createUser(req.target(), req.targetType(), req.name(), role);
        }

        if (!user.isActive()) {
            throw new UnauthorizedException("Your account has been deactivated.");
        }

        user.setVerified(true);
        userRepo.save(user);

        return AuthResponse.from(user, tokenProvider.generateToken(user));
    }

    /**
     * Direct registration — no OTP required.
     * Saves user immediately as verified=true and returns a JWT.
     */
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (!StringUtils.hasText(req.email()) && !StringUtils.hasText(req.mobile())) {
            throw new BadRequestException("Provide at least one of email or mobile.");
        }
        if (StringUtils.hasText(req.email()) && userRepo.existsByEmail(req.email())) {
            throw new BadRequestException("Email is already registered.");
        }
        if (StringUtils.hasText(req.mobile()) && userRepo.existsByMobile(req.mobile())) {
            throw new BadRequestException("Mobile number is already registered.");
        }

        UserRole role = parseRole(req.role());

        User.UserBuilder builder = User.builder()
                .name(req.name())
                .role(role)
                .verified(true)
                .active(true);

        if (StringUtils.hasText(req.email()))  builder.email(req.email());
        if (StringUtils.hasText(req.mobile())) builder.mobile(req.mobile());
        if (StringUtils.hasText(req.password())) {
            builder.passwordHash(passwordEncoder.encode(req.password()));
        }

        User saved = userRepo.save(builder.build());
        return AuthResponse.from(saved, tokenProvider.generateToken(saved));
    }

    /** Password-based login (optional — for admin accounts) */
    @Transactional(readOnly = true)
    public AuthResponse loginWithPassword(LoginRequest req) {
        User user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (user.getPasswordHash() == null ||
                !passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (!user.isActive()) {
            throw new UnauthorizedException("Your account has been deactivated.");
        }

        return AuthResponse.from(user, tokenProvider.generateToken(user));
    }

    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequest req) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (user.getPasswordHash() != null &&
                !passwordEncoder.matches(req.oldPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Current password is incorrect.");
        }

        user.setPasswordHash(passwordEncoder.encode(req.newPassword()));
        userRepo.save(user);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private User findExistingUser(String target, String targetType) {
        return "mobile".equals(targetType)
                ? userRepo.findByMobile(target).orElse(null)
                : userRepo.findByEmail(target).orElse(null);
    }

    private User createUser(String target, String targetType, String name, UserRole role) {
        User.UserBuilder builder = User.builder().name(name).role(role).verified(false);
        if ("mobile".equals(targetType)) {
            if (userRepo.existsByMobile(target)) {
                throw new BadRequestException("Mobile number already registered.");
            }
            builder.mobile(target);
        } else {
            if (userRepo.existsByEmail(target)) {
                throw new BadRequestException("Email already registered.");
            }
            builder.email(target);
        }
        return userRepo.save(builder.build());
    }

    private UserRole parseRole(String role) {
        try {
            return UserRole.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role: " + role +
                ". Valid values: EMPLOYER, JOBSEEKER, INSTITUTE, FACULTY, STUDENT");
        }
    }
}

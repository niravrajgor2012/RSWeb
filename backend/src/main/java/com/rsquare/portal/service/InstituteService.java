package com.rsquare.portal.service;

import com.rsquare.portal.dto.request.InstituteProfileRequest;
import com.rsquare.portal.entity.Institute;
import com.rsquare.portal.entity.User;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.repository.InstituteRepository;
import com.rsquare.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InstituteService {

    private final UserRepository userRepo;
    private final InstituteRepository instituteRepo;
    private final FileStorageService fileStorage;

    @Transactional(readOnly = true)
    public Institute getProfile(UUID userId) {
        return instituteRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Institute profile not found"));
    }

    @Transactional
    public Institute saveProfile(UUID userId, InstituteProfileRequest req,
                                 MultipartFile logo, MultipartFile brochure) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Institute inst = instituteRepo.findByUserId(userId)
                .orElse(Institute.builder().user(user).build());

        inst.setName(req.name());
        inst.setType(req.type());
        inst.setAffiliatedTo(req.affiliatedTo());
        inst.setCity(req.city());
        inst.setState(req.state());
        inst.setWebsite(req.website());
        inst.setContactPerson(req.contactPerson());
        inst.setBrief(req.brief());
        if (req.courses() != null) inst.setCourses(req.courses());
        inst.setPlacementRecord(req.placementRecord());

        if (logo != null && !logo.isEmpty()) {
            if (inst.getLogoUrl() != null) fileStorage.delete(inst.getLogoUrl());
            inst.setLogoUrl(fileStorage.storeImage(logo, "logos"));
        }
        if (brochure != null && !brochure.isEmpty()) {
            if (inst.getBrochureUrl() != null) fileStorage.delete(inst.getBrochureUrl());
            inst.setBrochureUrl(fileStorage.storeDocument(brochure, "brochures"));
        }

        return instituteRepo.save(inst);
    }

    @Transactional(readOnly = true)
    public List<Institute> getAllInstitutes() {
        return instituteRepo.findAll();
    }
}

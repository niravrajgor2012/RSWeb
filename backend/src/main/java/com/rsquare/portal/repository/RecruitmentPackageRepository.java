package com.rsquare.portal.repository;

import com.rsquare.portal.entity.RecruitmentPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecruitmentPackageRepository extends JpaRepository<RecruitmentPackage, UUID> {
    List<RecruitmentPackage> findAllByOrderByPriceAsc();
}

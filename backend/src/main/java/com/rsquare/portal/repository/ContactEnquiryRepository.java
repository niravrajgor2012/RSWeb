package com.rsquare.portal.repository;

import com.rsquare.portal.entity.ContactEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContactEnquiryRepository extends JpaRepository<ContactEnquiry, UUID> {
}

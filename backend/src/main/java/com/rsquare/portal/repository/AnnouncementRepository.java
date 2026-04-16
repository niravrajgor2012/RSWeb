package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {
    Page<Announcement> findAllByOrderByIsPinnedDescPublishedAtDesc(Pageable pageable);
    List<Announcement> findByIsPinnedTrue();
}

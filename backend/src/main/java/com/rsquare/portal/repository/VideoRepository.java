package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VideoRepository extends JpaRepository<Video, UUID> {
    Page<Video> findAllByOrderByPublishedAtDesc(Pageable pageable);
    List<Video> findByCategory(String category);
}

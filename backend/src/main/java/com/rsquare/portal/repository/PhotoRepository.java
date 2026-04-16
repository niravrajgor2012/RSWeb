package com.rsquare.portal.repository;

import com.rsquare.portal.entity.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    Page<Photo> findAllByOrderByTakenAtDesc(Pageable pageable);
}

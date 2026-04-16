package com.rsquare.portal.repository;

import com.rsquare.portal.entity.NewsItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NewsItemRepository extends JpaRepository<NewsItem, UUID> {
    Page<NewsItem> findAllByOrderByPublishedAtDesc(Pageable pageable);
}

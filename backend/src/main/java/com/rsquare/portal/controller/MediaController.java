package com.rsquare.portal.controller;

import com.rsquare.portal.dto.response.ApiResponse;
import com.rsquare.portal.dto.response.PagedResponse;
import com.rsquare.portal.entity.*;
import com.rsquare.portal.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    // ── Announcements (public) ────────────────────────────────────────────────

    @GetMapping("/announcements")
    public ResponseEntity<ApiResponse<PagedResponse<Announcement>>> getAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable p = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(mediaService.getAnnouncements(p))));
    }

    @PostMapping("/announcements")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Announcement>> createAnnouncement(
            @RequestBody Announcement ann) {
        return ResponseEntity.ok(ApiResponse.ok("Created", mediaService.saveAnnouncement(ann)));
    }

    @DeleteMapping("/announcements/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteAnnouncement(@PathVariable UUID id) {
        mediaService.deleteAnnouncement(id);
        return ResponseEntity.ok(ApiResponse.ok("Deleted"));
    }

    // ── News (public) ─────────────────────────────────────────────────────────

    @GetMapping("/news")
    public ResponseEntity<ApiResponse<PagedResponse<NewsItem>>> getNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable p = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(mediaService.getNews(p))));
    }

    @PostMapping("/news")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<NewsItem>> createNews(@RequestBody NewsItem item) {
        return ResponseEntity.ok(ApiResponse.ok("Created", mediaService.saveNews(item)));
    }

    // ── Photos (public) ───────────────────────────────────────────────────────

    @GetMapping("/photos")
    public ResponseEntity<ApiResponse<PagedResponse<Photo>>> getPhotos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable p = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(mediaService.getPhotos(p))));
    }

    @PostMapping("/photos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Photo>> createPhoto(@RequestBody Photo photo) {
        return ResponseEntity.ok(ApiResponse.ok("Created", mediaService.savePhoto(photo)));
    }

    // ── Videos (public) ───────────────────────────────────────────────────────

    @GetMapping("/videos")
    public ResponseEntity<ApiResponse<PagedResponse<Video>>> getVideos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable p = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(new PagedResponse<>(mediaService.getVideos(p))));
    }

    @PostMapping("/videos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Video>> createVideo(@RequestBody Video video) {
        return ResponseEntity.ok(ApiResponse.ok("Created", mediaService.saveVideo(video)));
    }
}

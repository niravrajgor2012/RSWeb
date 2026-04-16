package com.rsquare.portal.service;

import com.rsquare.portal.entity.*;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final AnnouncementRepository announcementRepo;
    private final NewsItemRepository newsRepo;
    private final PhotoRepository photoRepo;
    private final VideoRepository videoRepo;
    private final ClientRepository clientRepo;

    // ── Announcements ─────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<Announcement> getAnnouncements(Pageable pageable) {
        return announcementRepo.findAllByOrderByIsPinnedDescPublishedAtDesc(pageable);
    }

    @Transactional
    public Announcement saveAnnouncement(Announcement a) {
        return announcementRepo.save(a);
    }

    @Transactional
    public void deleteAnnouncement(UUID id) {
        if (!announcementRepo.existsById(id)) {
            throw new ResourceNotFoundException("Announcement", "id", id);
        }
        announcementRepo.deleteById(id);
    }

    // ── News ──────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<NewsItem> getNews(Pageable pageable) {
        return newsRepo.findAllByOrderByPublishedAtDesc(pageable);
    }

    @Transactional
    public NewsItem saveNews(NewsItem item) {
        return newsRepo.save(item);
    }

    // ── Photos ────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<Photo> getPhotos(Pageable pageable) {
        return photoRepo.findAllByOrderByTakenAtDesc(pageable);
    }

    @Transactional
    public Photo savePhoto(Photo photo) {
        return photoRepo.save(photo);
    }

    // ── Videos ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<Video> getVideos(Pageable pageable) {
        return videoRepo.findAllByOrderByPublishedAtDesc(pageable);
    }

    @Transactional
    public Video saveVideo(Video video) {
        return videoRepo.save(video);
    }

    // ── Clients ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<Client> getAllClients() {
        return clientRepo.findAllByOrderByNameAsc();
    }

    @Transactional
    public Client saveClient(Client client) {
        return clientRepo.save(client);
    }
}

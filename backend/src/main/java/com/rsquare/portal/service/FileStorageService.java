package com.rsquare.portal.service;

import com.rsquare.portal.exception.BadRequestException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private static final long MAX_IMAGE_BYTES = 5 * 1024 * 1024;   // 5 MB
    private static final long MAX_DOC_BYTES   = 10 * 1024 * 1024;  // 10 MB

    private static final Set<String> ALLOWED_IMAGE_TYPES =
            Set.of("image/jpeg", "image/png", "image/webp", "image/gif");
    private static final Set<String> ALLOWED_DOC_TYPES =
            Set.of("application/pdf",
                   "application/msword",
                   "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
            log.info("Upload directory ready: {}", Paths.get(uploadDir).toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    /**
     * Store an image file. Returns the public URL path like /uploads/logos/uuid.jpg
     */
    public String storeImage(MultipartFile file, String subDir) {
        validateFile(file, ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, "image");
        return store(file, subDir);
    }

    /**
     * Store a document (PDF/Word). Returns the public URL path.
     */
    public String storeDocument(MultipartFile file, String subDir) {
        validateFile(file, ALLOWED_DOC_TYPES, MAX_DOC_BYTES, "document (PDF/Word)");
        return store(file, subDir);
    }

    /**
     * Delete a previously stored file given its URL path.
     */
    public void delete(String urlPath) {
        if (urlPath == null) return;
        // urlPath is like /uploads/logos/uuid.jpg
        String relative = urlPath.startsWith("/uploads/") ? urlPath.substring(9) : urlPath;
        Path target = Paths.get(uploadDir).resolve(relative).normalize();
        try {
            Files.deleteIfExists(target);
        } catch (IOException e) {
            log.warn("Could not delete file: {}", target);
        }
    }

    // ── private helpers ───────────────────────────────────────────────────────

    private String store(MultipartFile file, String subDir) {
        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = original.contains(".")
                ? original.substring(original.lastIndexOf('.'))
                : "";
        String filename = UUID.randomUUID() + ext;

        Path dir = Paths.get(uploadDir, subDir);
        try {
            Files.createDirectories(dir);
            Path target = dir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + subDir + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + filename, e);
        }
    }

    private void validateFile(MultipartFile file, Set<String> allowed, long maxBytes, String label) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is empty.");
        }
        if (file.getSize() > maxBytes) {
            throw new BadRequestException("File exceeds maximum allowed size for a " + label + ".");
        }
        String contentType = file.getContentType();
        if (contentType == null || !allowed.contains(contentType)) {
            throw new BadRequestException("Invalid file type '" + contentType +
                "' for " + label + ". Allowed: " + allowed);
        }
    }
}

package com.rsquare.portal.service;

import com.rsquare.portal.entity.JobPost;
import com.rsquare.portal.exception.ResourceNotFoundException;
import com.rsquare.portal.repository.JobPostRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobPostRepository jobPostRepo;

    @Transactional(readOnly = true)
    public Page<JobPost> searchJobs(String query, String jobType, String city,
                                    String department, String skill,
                                    String employerType, String company,
                                    Pageable pageable) {
        Specification<JobPost> spec = buildSpec(query, jobType, city, department,
                skill, employerType, company);
        return jobPostRepo.findAll(spec, pageable);
    }

    @Transactional(readOnly = true)
    public JobPost getById(UUID id) {
        return jobPostRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", id));
    }

    @Transactional(readOnly = true)
    public List<JobPost> getFeatured() {
        return jobPostRepo.findByIsFeaturedTrueAndIsActiveTrue();
    }

    @Transactional(readOnly = true)
    public long countActive() {
        return jobPostRepo.countByIsActiveTrue();
    }

    // ── Specification builder ─────────────────────────────────────────────────

    private Specification<JobPost> buildSpec(String query, String jobType, String city,
                                              String department, String skill,
                                              String employerType, String company) {
        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always restrict to active jobs
            predicates.add(cb.isTrue(root.get("isActive")));

            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), like),
                        cb.like(cb.lower(root.get("companyName")), like),
                        cb.like(cb.lower(root.get("description")), like)
                ));
            }
            if (StringUtils.hasText(jobType)) {
                predicates.add(cb.equal(root.get("jobType"), jobType));
            }
            if (StringUtils.hasText(city)) {
                predicates.add(cb.equal(root.get("city"), city));
            }
            if (StringUtils.hasText(department)) {
                predicates.add(cb.equal(root.get("department"), department));
            }
            if (StringUtils.hasText(employerType)) {
                predicates.add(cb.equal(root.get("employerType"), employerType));
            }
            if (StringUtils.hasText(company)) {
                predicates.add(cb.like(cb.lower(root.get("companyName")),
                        "%" + company.toLowerCase() + "%"));
            }
            if (StringUtils.hasText(skill)) {
                // Join on @ElementCollection skills
                jakarta.persistence.criteria.Join<JobPost, String> skillJoin = root.join("skills");
                predicates.add(cb.like(cb.lower(skillJoin.as(String.class)),
                        "%" + skill.toLowerCase() + "%"));
                criteriaQuery.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

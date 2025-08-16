package com.smartresume.backend.repository;

import com.smartresume.backend.model.ResumeMatch;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ResumeMatchRepository extends JpaRepository<ResumeMatch, Long> {}

package com.smartresume.backend.controller;

import com.smartresume.backend.service.JobSearchService;
import com.smartresume.backend.service.ResumeService;
import com.smartresume.backend.service.ResumeService.MatchingResult;
import com.smartresume.backend.model.JobSearchRequest;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173"})
public class ResumeController {

    private final ResumeService resumeService;
    private final Tika tika = new Tika();
    private final JobSearchService jobSearchService;

    @Autowired
    public ResumeController(ResumeService resumeService, JobSearchService jobSearchService) {
        this.resumeService = resumeService;
        this.jobSearchService = jobSearchService;
    }

    @PostMapping("/match")
    public ResponseEntity<Map<String, Object>> uploadResume(
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobDescription") String jobDescription) {

        Map<String, Object> response = new HashMap<>();

        try {
            String resumeText = tika.parseToString(resumeFile.getInputStream());
            String filtered = resumeService.extractRelevantSections(resumeText);
            
            MatchingResult result = resumeService.calculateMatchScore(filtered, jobDescription);

            resumeService.saveMatch(
                    resumeText,
                    jobDescription,
                    result.getMatchScore(),
                    String.join(", ", result.getMatchedSkills()),
                    String.join(", ", result.getUnmatchedSkills())
            );

            response.put("message", "Resume analyzed successfully");
            response.put("matchScore", result.getMatchScore());
            response.put("matchedSkills", result.getMatchedSkills());
            response.put("unmatchedSkills", result.getUnmatchedSkills());

            return ResponseEntity.ok(response);

        } catch (IOException | TikaException e) {
            response.put("error", "Resume processing failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    
    // THIS IS THE FIX: This new endpoint must be present in your controller.
    @PostMapping("/find-linkedin-jobs")
    public ResponseEntity<String> findLinkedInJobs(@RequestBody JobSearchRequest request) {
        try {
            String linkedinUrl = jobSearchService.generateLinkedInSearchUrl(request.getJobDescription());
            return ResponseEntity.ok(linkedinUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error generating URL.");
        }
    }
}
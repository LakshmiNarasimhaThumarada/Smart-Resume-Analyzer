package com.smartresume.backend.model;

import jakarta.persistence.*;

@Entity
public class ResumeMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10000)
    private String resumeText;

    @Column(length = 10000)
    private String jobDescription;

    private int matchScore;

    // New fields to store matched and unmatched skills
    @Column(length = 10000)
    private String matchedSkills;

    @Column(length = 10000)
    private String unmatchedSkills;

    public ResumeMatch() {}

    public ResumeMatch(String resumeText, String jobDescription, int matchScore, String matchedSkills, String unmatchedSkills) {
        this.resumeText = resumeText;
        this.jobDescription = jobDescription;
        this.matchScore = matchScore;
        this.matchedSkills = matchedSkills;
        this.unmatchedSkills = unmatchedSkills;
    }

    // Getters and Setters for the new fields
    public String getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(String matchedSkills) { this.matchedSkills = matchedSkills; }

    public String getUnmatchedSkills() { return unmatchedSkills; }
    public void setUnmatchedSkills(String unmatchedSkills) { this.unmatchedSkills = unmatchedSkills; }

    // Existing Getters and Setters
    public Long getId() { return id; }
    public String getResumeText() { return resumeText; }
    public String getJobDescription() { return jobDescription; }
    public int getMatchScore() { return matchScore; }

    public void setId(Long id) { this.id = id; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }
}
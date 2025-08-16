// src/main/java/com/smartresume/backend/model/JobSearchRequest.java
package com.smartresume.backend.model;

public class JobSearchRequest {
    private String jobDescription;

    // Default constructor
    public JobSearchRequest() {
    }

    // Getters and Setters
    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
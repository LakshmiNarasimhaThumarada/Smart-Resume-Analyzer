package com.smartresume.backend.service;

import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.io.UnsupportedEncodingException;
@Service
public class JobSearchService {

    public String generateLinkedInSearchUrl(String jobDescription) {
        try {
            // Encode the job description to be safe for a URL
            String encodedDescription = URLEncoder.encode(jobDescription, StandardCharsets.UTF_8.toString());

            // Return the full LinkedIn job search URL
            return "https://www.linkedin.com/jobs/search?keywords=" + encodedDescription;
        } catch (UnsupportedEncodingException e) {
            // Handle the error by logging it and returning a default URL
            e.printStackTrace();
            return "https://www.linkedin.com/jobs/search?keywords=job"; // Fallback URL
        }
    }
}
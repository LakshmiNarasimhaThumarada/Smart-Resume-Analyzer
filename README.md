Smart Resume Analyzer

The Smart Resume Analyzer is a full-stack web application that helps job seekers and recruiters by analyzing resumes and matching them with job descriptions. It leverages Natural Language Processing (NLP) and machine learning techniques to calculate skill relevance, giving a clear match score between resumes and job roles.

Features

 Resume Parsing: Extracts text from resumes using Apache Tika.

 AI-Powered NLP: Integrated Google Gemini API for natural language understanding.

 Intelligent Matching: Uses TF-IDF with cosine similarity for accurate skill-based matching.

 Match Score Calculation: Provides a relevance score between resumes and job descriptions.

 History Tracking: Stores analyzed results in a database for future reference.

 Modern UI: Built with ReactJS for a clean and interactive user experience.

🛠 Tech Stack
Frontend

ReactJS

Tailwind CSS / CSS Modules

Backend

Spring Boot (Java)

Apache Tika (Resume text extraction)

Google Gemini API (NLP)

TF-IDF + Cosine Similarity (Skill matching algorithm)

Database

MySQL / PostgreSQL

 Project Structure
Smart-Resume-Analyzer/
│── frontend/          # ReactJS client
│── backend/           # Spring Boot server         
│── README.md

Installation & Setup
Prerequisites

Node.js & npm

Java (JDK 17+)

Maven

MySQL / PostgreSQL

// src/pages/JobDescriptionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import NavBar from '../components/NavBar';
import SideNavBar from '../components/SideNavBar';
import './JobDescriptionPage.css';

// --- NEW JOB DESCRIPTION DATA (Your Content) ---
// I've used your provided descriptions and assigned categories.
const frontendJobDescriptions = [
  {
    id: 'sd-001',
    title: 'Frontend Developer',
    description: 'Design, develop, and maintain engaging, high-performance user interfaces for web applications. Collaborate with cross-functional teams including designers, backend developers, and product managers, and deliver intuitive and responsive user experiences.',
    category: 'Software Development Roles'
  },
    {
    id: 'sd-002',
    title: 'Backend Developer',
    description: 'Design, develop, and maintain robust, scalable backend systems and APIs that power web and mobile applications. Collaborate with cross-functional teams to define, build, and deliver new features and data services. Write clean, efficient, and well-documented server-side code following best practices in security, performance, and architecture.',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-003',
    title: 'Full Stack Developer',
    description: 'Develop and manage both front-end and back-end components of web applications. Expertise in modern JavaScript frameworks (React/Angular/Vue) and server-side languages (Node.js/Python/Java). Database design and API development skills are essential.',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-004',
    title: 'Web Developer',
    description: 'Design, develop, and maintain dynamic, user-friendly websites and web applications. Write clean, scalable, and well-documented code using modern web technologies including HTML, CSS, JavaScript, and backend frameworks. Ensure cross-browser compatibility, mobile responsiveness, and optimal performance across devices. Integrate APIs, databases, and third-party services to support full-stack functionality. ',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-005',
    title: 'Mobile App Developer',
    description: 'Design, develop, and maintain high-quality mobile applications for Android and/or iOS platforms. Collaborate with cross-functional teams including designers, backend developers, and product managers to define, build, and ship new mobile features  Integrate mobile apps with backend services and third-party APIs. Participate in code reviews, testing, and debugging to ensure a smooth user experience',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-006',
    title: 'Desktop Application Developer',
    description: 'Design, develop, and maintain high-performance desktop applications for Windows, macOS, or Linux platforms. Collaborate with cross-functional teams to define application requirements and deliver intuitive, reliable, and feature-rich software Integrate desktop apps with local databases, APIs, and external services. Ensure robust performance, security, and a seamless user experience. Participate in code reviews, debugging, and software testing.',
    category: 'Software Development Roles'
  },
    {
    id: 'sd-007',
    title: 'Game Developer',
    description: 'Design, develop, and maintain interactive and high-performance games across desktop, mobile, or console platforms. Collaborate with game designers, artists, and sound engineers to translate ideas into engaging gameplay experiences Implement game mechanics, physics, animations, UI, and AI behaviors. Optimize game performance and ensure smooth cross-platform functionality.',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-008',
    title: 'Embedded Software Engineer',
    description: 'Design, develop, and maintain embedded software systems for hardware-based products and devices. Collaborate with hardware engineers and cross-functional teams to define system requirements, design specifications, and integration plans  Write efficient, reliable, and well-documented code in C, C++, or assembly for microcontrollers, processors, and real-time operating systems (RTOS).',
    category: 'Software Development Roles'
  },
  {
    id: 'sd-009',
    title: 'API Developer',
    description: 'Design, develop, and maintain robust and secure APIs that enable seamless communication between systems, applications, and services. Collaborate with frontend and backend teams to define API requirements, data models, and integration workflows  Write clean, scalable, and well-documented code using RESTful and/or GraphQL standards. Implement authentication, authorization, and rate-limiting mechanisms to ensure API security and performance.',
    category: 'Software Development Roles'
  },
  {
    id: 'data-001',
    title: 'Data Scientis',
    description: 'Collect, analyze, and interpret large volumes of structured and unstructured data to extract meaningful insights and support data-driven decision-making. Collaborate with cross-functional teams to understand business challenges and design predictive models, machine learning algorithms, and statistical solutions. Develop and maintain data pipelines, dashboards, and analytical tools using Python, R, SQL, and data visualization libraries.',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-002',
    title: 'Data Analyst',
    description: 'Collect, process, and analyze data to uncover trends, patterns, and actionable insights that support business decisions Build and maintain dashboards, reports, and visualizations using tools like Excel, SQL, Power BI, or Tableau. Clean and transform raw data into meaningful formats for analysis. Perform statistical analysis to identify correlations, forecast outcomes, and monitor key performance indicators (KPIs). Ensure data accuracy, consistency, and integrity',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-003',
    title: 'Data Engineer',
    description: 'Design, develop, and maintain scalable data pipelines and infrastructure to support data collection, processing, storage, and analytics across the organization  Build and manage ETL/ELT workflows using tools such as Apache Spark, Airflow, or Informatica. Work with large datasets using SQL, Python, and cloud platforms like AWS, GCP, or Azure. Ensure data quality, security, and compliance with governance standards.',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-004',
    title: 'Machine Learning Engineer',
    description: 'Design, develop, and deploy machine learning models and systems to solve real-world problems and enhance product intelligence define requirements, and implement scalable ML solutions. Build and train models using libraries such as TensorFlow, PyTorch, or Scikit-learn. Optimize model performance and integrate them into production environments using APIs and pipelines. Monitor and maintain deployed models to ensure accuracy and efficiency over time.',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-005',
    title: 'AI Engineer',
    description: 'Design, develop, and deploy intelligent systems that leverage artificial intelligence to solve complex problems and enhance automation build AI-driven applications using techniques such as deep learning, natural language processing (NLP), computer vision, and reinforcement learning. Develop scalable models and algorithms using frameworks like TensorFlow, PyTorch, and OpenCV.',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-006',
    title: 'Business Intelligence Developer',
    description: 'Design, develop, and maintain business intelligence solutions that help organizations make data-driven decisions Collaborate with stakeholders to understand business needs and translate them into interactive dashboards, reports, and data visualizations. Build and optimize data models and ETL processes using tools such as Power BI, Tableau, SQL, and SSIS.',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-007',
    title: 'NLP Engineer',
    description: 'Design, develop, and deploy natural language processing models and systems that enable machines to understand, interpret, and generate human language. Collaborate with data scientists, AI engineers, and product teams to build NLP-powered features such as text classification, sentiment analysis, named entity recognition, chatbots, and language generation. ',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-008',
    title: 'Computer Vision Engineer',
    description: 'Design, develop, and implement computer vision systems that enable machines to analyze and understand visual data. Collaborate with cross-functional teams to build intelligent solutions for tasks such as object detection, image classification, facial recognition, segmentation, and video analysis. Develop and optimize models using deep learning frameworks like TensorFlow, PyTorch, and OpenCV. ',
    category: 'Data & AI Roles'
  },
  {
    id: 'data-009',
    title: 'Big Data Engineer',
    description: 'Design, develop, and maintain scalable big data infrastructure and data processing pipelines to manage large volumes of structured and unstructured data. Collaborate with data scientists, analysts, and platform engineers to build efficient systems for data ingestion, storage, and analysis. Work with big data technologies such as Hadoop, Spark, Hive, Kafka, and distributed file systems.',
    category: 'Data & AI Roles'
  },
  {
    id: 'devops-001',
    title: 'DevOps Engineer',
    description: 'Design, implement, and manage automated CI/CD pipelines, cloud infrastructure, and configuration management systems to support scalable software development and deployment. Collaborate with developers, QA engineers, and system administrators to ensure seamless code integration, delivery, and monitoring. Work with DevOps tools and technologies such as Jenkins, Docker, Kubernetes, Terraform, and cloud platforms like AWS, Azure, or GCP to optimize system performance, reliability, and security.',
    category: 'DevOps & Infrastructure'
  },
  {
    id: 'devops-002',
    title: 'Site Reliability Engineer',
    description: 'Design, build, and maintain highly reliable and scalable systems by applying software engineering principles to infrastructure and operations. Collaborate with development and operations teams to automate deployment, monitoring, and incident response processes. Ensure system uptime, performance, and availability by leveraging tools such as Prometheus, Grafana, Kubernetes, and Terraform. Work with cloud platforms and develop solutions for fault tolerance, incident management, and capacity planning to enhance overall system resilience.',
    category: 'DevOps & Infrastructure'
  },
  {
    id: 'devops-003',
    title: 'Cloud Engineer',
    description: 'Design, deploy, and manage cloud-based infrastructure and services to ensure secure, scalable, and high-performance environments. Collaborate with development, DevOps, and security teams to architect cloud solutions that meet business and technical requirements. Work with cloud platforms such as AWS, Azure, or Google Cloud to automate infrastructure provisioning, manage virtual networks, and implement cost-effective cloud strategies. Utilize tools like Terraform, Ansible, and Kubernetes to support infrastructure as code (IaC), container orchestration, and cloud-native application deployment.',
    category: 'DevOps & Infrastructure'
  },
    {
    id: 'devops-004',
    title: 'Build And Release Engineer',
    description: 'Design, automate, and manage build and release processes to ensure reliable and consistent software delivery across development, testing, and production environments. Collaborate with developers, QA teams, and DevOps engineers to configure CI/CD pipelines, troubleshoot build issues, and maintain version control systems. Work with tools such as Jenkins, Maven, Gradle, Git, and Docker to streamline build automation, artifact management, and deployment workflows. Ensure traceability, rollback capabilities, and compliance with release policies through effective versioning and release documentation.',
    category: 'DevOps & Infrastructure'
  },
  {
    id: 'devops-005',
    title: 'Infrastructure Engineer',
    description: 'Design, implement, and maintain robust IT infrastructure systems to support enterprise applications, network operations, and cloud or on-premise environments. Collaborate with DevOps, security, and systems teams to ensure high availability, scalability, and security of infrastructure components. Work with virtualization technologies, cloud services (AWS, Azure, GCP), networking equipment, and automation tools like Ansible, Terraform, and PowerShell to manage servers, networks, and storage solutions. Monitor system performance, troubleshoot infrastructure issues, and implement best practices for capacity planning and disaster recovery.',
    category: 'DevOps & Infrastructure'
  },
  {
    id: 'devops-006',
    title: 'Platform Engineer',
    description: 'Design, build, and maintain scalable internal platforms that enable efficient software development, deployment, and operations across teams. Collaborate with developers, DevOps, and infrastructure teams to create self-service tools, APIs, and automated systems for CI/CD, monitoring, and infrastructure provisioning. Work with technologies like Kubernetes, Docker, Terraform, and cloud platforms (AWS, GCP, Azure) to abstract infrastructure complexity and improve developer productivity. Ensure platform reliability, security, and scalability while promoting best practices in software engineering and infrastructure automation.',
    category: 'DevOps & Infrastructure'
  },
    {
    id: 'devops-007',
    title: 'Systems Administrator',
    description: 'Install, configure, and maintain servers, networks, and operating systems to ensure the stability, security, and efficiency of IT infrastructure. Collaborate with IT, security, and development teams to manage user access, system backups, and routine maintenance tasks. Monitor system performance, troubleshoot hardware and software issues, and apply updates and patches to maintain system integrity. Work with technologies such as Windows Server, Linux, Active Directory, VMware, and cloud services to support both on-premise and cloud-based environments.',
    category: 'DevOps & Infrastructure'
  },
  {
    id: 'qa-001',
    title: 'QA Engineer',
    description: 'Design, develop, and execute test plans and test cases to ensure the quality, reliability, and performance of software applications. Collaborate with developers, product managers, and other stakeholders to understand requirements and identify edge cases. Perform manual and automated testing using tools like Selenium, JUnit, TestNG, or Cypress to detect bugs early in the development lifecycle. Work across functional, regression, integration, and performance testing phases to ensure software meets business and technical expectations.',
    category: 'Quality Assurance & Testing'
  },
  {
    id: 'qa-002',
    title: 'Manual Tester',
    description: 'Design and execute manual test cases to verify the functionality, usability, and reliability of software applications across various platforms. Collaborate with developers, business analysts, and QA teams to understand requirements, identify test scenarios, and ensure thorough test coverage. Perform functional, regression, exploratory, and user acceptance testing (UAT) to detect and report bugs throughout the software development lifecycle. Document test results, track defects using tools like Jira or Bugzilla, and ensure timely resolution to maintain product quality.',
    category: 'Quality Assurance & Testing'
  },
  {
    id: 'qa-003',
    title: 'Automation Tester',
    description: 'Design, develop, and maintain automated test scripts to validate the functionality, performance, and reliability of software applications. Collaborate with developers, QA analysts, and product teams to define test strategies, create test cases, and integrate automated tests into CI/CD pipelines. Use tools such as Selenium, Cypress, Playwright, JUnit, or TestNG to automate functional, regression, and end-to-end testing across web and mobile platforms. Analyze test results, report defects, and contribute to improving overall test coverage and software quality.',
    category: 'Quality Assurance & Testing'
  },
  {
    id: 'qa-004',
    title: 'Performance Tester',
    description: 'Design and execute performance, load, and stress tests to evaluate the responsiveness, stability, and scalability of software applications under varying workloads. Collaborate with developers, QA engineers, and system architects to identify performance bottlenecks and optimize application and infrastructure performance. Use tools like JMeter, LoadRunner, Gatling, or k6 to simulate real-world traffic, measure system behavior, and generate detailed performance reports. Analyze test results, monitor system metrics, and recommend improvements to ensure applications meet performance and reliability standards.',
    category: 'Quality Assurance & Testing'
  },
   {
    id: 'qa-005',
    title: 'Test Architect',
    description: 'Design and define the overall testing strategy, framework, and best practices to ensure comprehensive and scalable test coverage across the software development lifecycle. Collaborate with QA teams, developers, and product managers to architect end-to-end testing solutions, including functional, automation, performance, and security testing. Evaluate and implement testing tools and technologies such as Selenium, Cypress, JMeter, and CI/CD integrations to support continuous testing. Guide and mentor QA teams, establish quality metrics, and drive improvements in test efficiency, reliability, and traceability across projects.',
    category: 'Quality Assurance & Testing'
  },
   {
    id: 'qa-006',
    title: 'SDET(Software Development Engineer in Test)',
    description: 'Design, develop, and maintain automated testing frameworks and test suites to ensure the quality and reliability of software products. Collaborate with developers, QA engineers, and product teams to integrate testing early in the development lifecycle through shift-left practices. Write scalable test scripts in programming languages like Java, Python, or JavaScript using tools such as Selenium, JUnit, TestNG, Cypress, or Playwright. Contribute to CI/CD pipelines, perform API testing, and drive quality through code-level validation, performance checks, and test coverage optimization.',
    category: 'Quality Assurance & Testing'
  },
  {
    id: 'cyber-001',
    title: 'Security Engineer',
    description: 'Design, implement, and maintain security solutions to protect applications, systems, and networks from cyber threats and vulnerabilities. Collaborate with development, operations, and compliance teams to conduct risk assessments, threat modeling, and security reviews throughout the software development lifecycle. Work with tools such as firewalls, intrusion detection systems (IDS/IPS), vulnerability scanners, and SIEM platforms to monitor and respond to security incidents. Implement best practices for identity and access management (IAM), encryption, secure coding, and cloud security to ensure data confidentiality, integrity, and availability.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-002',
    title: 'Ethical Hacker / Penetration Tester',
    description: 'Conduct authorized security assessments and penetration tests to identify vulnerabilities in applications, networks, and systems before malicious actors can exploit them. Collaborate with security teams, developers, and IT administrators to simulate real-world cyberattacks and assess the effectiveness of existing defenses. Use tools such as Metasploit, Burp Suite, Nmap, Wireshark, and Kali Linux to perform reconnaissance, exploit vulnerabilities, and generate detailed security reports. Provide actionable recommendations to remediate risks, improve security posture, and ensure compliance with industry standards and regulations.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-003',
    title: 'Network Security Engineer',
    description: 'Design, implement, and maintain secure network architectures to protect organizational data and systems from unauthorized access, attacks, and breaches. Collaborate with IT, security, and infrastructure teams to configure firewalls, VPNs, intrusion detection/prevention systems (IDS/IPS), and access controls. Monitor network traffic, analyze security incidents, and respond to threats using tools like Wireshark, Cisco ASA, Palo Alto, and SIEM platforms. Conduct regular vulnerability assessments, apply network security best practices, and ensure compliance with security policies and regulatory standards such as ISO 27001, NIST, and GDPR.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-004',
    title: 'SOC Analyst',
    description: 'Monitor, detect, analyze, and respond to cybersecurity incidents and threats across an organization’s IT infrastructure. Work in a 24/7 Security Operations Center (SOC) environment to investigate alerts generated by SIEM tools, assess the severity of threats, and initiate incident response procedures. Collaborate with security engineers, incident responders, and IT teams to mitigate risks, document findings, and improve threat detection capabilities. Utilize tools like Splunk, QRadar, CrowdStrike, Wireshark, and threat intelligence platforms to perform real-time monitoring, log analysis, and forensic investigations.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-005',
    title: 'Information Security Analyst',
    description: 'Plan, implement, and monitor security measures to protect sensitive data and information systems from cyber threats and unauthorized access. Collaborate with IT, compliance, and risk management teams to assess vulnerabilities, enforce security policies, and ensure adherence to regulatory standards like ISO 27001, HIPAA, and GDPR. Analyze security breaches, perform risk assessments, and recommend safeguards for system hardening and data protection. Utilize tools such as firewalls, antivirus software, SIEM platforms, and vulnerability scanners to monitor security events and maintain a strong security posture.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-006',
    title: 'IAM Engineer (Identity & Access Management)',
    description: 'Design, implement, and manage identity and access management solutions to ensure secure authentication, authorization, and user lifecycle management across enterprise systems. Collaborate with security, IT, and compliance teams to enforce role-based access controls (RBAC), least privilege principles, and regulatory compliance requirements. Work with IAM tools such as Okta, Azure AD, Ping Identity, SailPoint, or ForgeRock to manage single sign-on (SSO), multi-factor authentication (MFA), and identity federation. Monitor access logs, conduct audits, and support incident investigations to prevent unauthorized access and protect sensitive information.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-007',
    title: 'Cryptography Engineer',
    description: 'Design, implement, and maintain cryptographic algorithms, protocols, and systems to ensure the confidentiality, integrity, and authenticity of sensitive data and communications. Collaborate with security architects, software engineers, and compliance teams to integrate encryption, digital signatures, and key management solutions into applications and infrastructure. Work with cryptographic libraries and standards such as OpenSSL, Bouncy Castle, PKCS, TLS/SSL, and AES/RSA/ECC. Conduct security assessments, analyze cryptographic vulnerabilities, and support the development of secure systems that comply with industry standards like FIPS 140-3 and NIST guidelines.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'cyber-008',
    title: 'Risk & Compliance Analyst',
    description: 'Identify, assess, and monitor risks to ensure compliance with internal policies, industry standards, and regulatory requirements such as GDPR, HIPAA, SOX, or ISO 27001. Collaborate with security, legal, and IT teams to develop risk mitigation strategies, conduct audits, and support policy enforcement. Analyze business processes and systems for potential vulnerabilities or compliance gaps, and recommend controls to reduce organizational risk exposure. Prepare risk assessments, compliance reports, and documentation to support governance and ensure audit readiness across the organization.',
    category: 'Cybersecurity & Networking'
  },
  {
    id: 'db-001',
    title: 'Database Administrator',
    description: 'Design, implement, and maintain reliable, secure, and high-performance database systems to support application and business requirements. Collaborate with developers, data analysts, and infrastructure teams to manage database architecture, optimize queries, and ensure data integrity. Perform regular backups, recovery planning, performance tuning, and capacity management for databases such as MySQL, PostgreSQL, Oracle, SQL Server, or MongoDB. Monitor database activity, troubleshoot issues, and enforce security controls, access policies, and compliance with data governance standards.',
    category: 'Database & Storage'
  },
  {
    id: 'db-002',
    title: 'Database Developer',
    description: 'Design, develop, and optimize database solutions to support application features, data integrity, and performance requirements. Collaborate with software engineers, data analysts, and DBAs to write efficient SQL queries, stored procedures, triggers, and functions for relational and NoSQL databases. Work with technologies such as MySQL, PostgreSQL, SQL Server, Oracle, or MongoDB to model data structures, design schemas, and support ETL processes. Ensure data consistency, scalability, and security while contributing to the development of robust data-driven applications.',
    category: 'Database & Storage'
  },
  {
    id: 'db-003',
    title: 'Data Warehouse Engineer',
    description: 'Design, develop, and maintain scalable data warehouse solutions to support analytics, reporting, and business intelligence needs. Collaborate with data engineers, analysts, and business stakeholders to model data structures, build ETL pipelines, and ensure efficient data integration from multiple sources. Work with data warehousing technologies such as Amazon Redshift, Snowflake, Google BigQuery, or Azure Synapse, and ETL tools like Apache Airflow, Talend, or Informatica. Optimize query performance, ensure data quality, and implement best practices for data governance, security, and compliance.',
    category: 'Database & Storage'
  },
  {
    id: 'db-004',
    title: 'ELT Developer',
    description: 'Design, develop, and manage ELT pipelines to extract data from diverse sources, load it into data warehouses or data lakes, and transform it for analytical and business intelligence purposes. Collaborate with data engineers, analysts, and business teams to understand data requirements and implement scalable, efficient data integration workflows. Use tools and technologies such as SQL, Python, Apache Airflow, dbt (data build tool), Snowflake, BigQuery, or Azure Data Factory to automate and orchestrate ELT processes. Ensure data accuracy, consistency, and compliance with security and governance policies throughout the data lifecycle.',
    category: 'Database & Storage'
  },
  {
    id: 'db-005',
    title: 'NoSQL Specialist',
    description: 'Design, implement, and optimize NoSQL database solutions to support scalable, high-performance applications handling unstructured or semi-structured data. Collaborate with backend developers, data architects, and DevOps teams to model data, configure clusters, and ensure data consistency across distributed systems. Work with NoSQL technologies such as MongoDB, Cassandra, Redis, Couchbase, or DynamoDB to manage document, key-value, column-family, or graph-based data structures. Monitor performance, implement replication and sharding strategies, and ensure data security, backup, and disaster recovery in NoSQL environments.',
    category: 'Database & Storage'
  },
  {
    id: 'pm-001',
    title: 'Product Manager',
    description: 'Define and drive the product vision, strategy, and roadmap to deliver customer-centric solutions aligned with business objectives. Collaborate with cross-functional teams including engineering, design, marketing, and sales to gather requirements, prioritize features, and oversee the product development lifecycle. Conduct market research, user interviews, and competitive analysis to identify opportunities and validate product decisions. Translate business goals into detailed product requirements and user stories, manage the product backlog, and ensure timely, high-quality releases.',
    category: 'Project & Product Management'
  },
    {
    id: 'pm-002',
    title: 'Project Manager',
    description: 'Plan, execute, and oversee projects from initiation to completion, ensuring they are delivered on time, within scope, and within budget. Collaborate with cross-functional teams including engineering, design, QA, and stakeholders to define project objectives, manage timelines, allocate resources, and mitigate risks. Utilize project management methodologies such as Agile, Scrum, or Waterfall and tools like Jira, Trello, or MS Project to track progress, manage tasks, and communicate effectively. Ensure clear documentation, stakeholder alignment, and continuous improvement throughout the project lifecycle.',
    category: 'Project & Product Management'
  },
 {
    id: 'pm-003',
    title: 'Program Manager',
    description: 'Oversee and coordinate multiple interrelated projects to achieve strategic business objectives and ensure alignment across teams, timelines, and deliverables. Collaborate with project managers, product owners, and senior leadership to define program goals, manage dependencies, allocate resources, and mitigate risks. Monitor overall program performance, track KPIs, and ensure cohesive execution across cross-functional initiatives. Utilize program management frameworks and tools such as Agile, SAFe, or PMP methodologies to drive consistent progress, stakeholder engagement, and successful delivery of complex, high-impact programs.',
    category: 'Project & Product Management'
  },
  {
    id: 'pm-004',
    title: 'Scrum Master',
    description: 'Facilitate Agile development processes by serving as a servant-leader for Scrum teams, ensuring adherence to Scrum principles and removing impediments to team progress. Collaborate with product owners, developers, and stakeholders to support sprint planning, daily stand-ups, sprint reviews, and retrospectives. Foster a culture of continuous improvement, team accountability, and transparent communication. Utilize tools like Jira, Confluence, or Azure DevOps to track sprint progress, manage backlogs, and promote Agile best practices to deliver high-quality, incremental value.',
    category: 'Project & Product Management'
  },
  {
    id: 'pm-005',
    title: 'Agile coach',
    description: 'Guide organizations, teams, and leaders in adopting and scaling Agile frameworks to improve collaboration, delivery speed, and product quality. Partner with Scrum Masters, Product Owners, and executives to assess Agile maturity, identify areas for improvement, and implement tailored coaching strategies. Facilitate workshops, mentor Agile teams, and promote a mindset of continuous improvement, self-organization, and customer-centric delivery. Leverage frameworks such as Scrum, Kanban, SAFe, or LeSS and tools like Jira, Miro, and Confluence to support Agile transformation and alignment across the organization.',
    category: 'Project & Product Management'
  },
  {
    id: 'pm-006',
    title: 'Delivery Manager',
    description: 'Oversee the end-to-end delivery of technology projects and services, ensuring alignment with business objectives, quality standards, and customer expectations. Collaborate with cross-functional teams including project managers, developers, QA, and stakeholders to manage timelines, resources, and risks across multiple initiatives. Drive Agile or hybrid delivery methodologies, monitor key performance indicators (KPIs), and ensure smooth communication and issue resolution throughout the delivery lifecycle. Focus on continuous improvement, stakeholder satisfaction, and delivering value at scale in a fast-paced environment.',
    category: 'Project & Product Management'
  },
  {
    id: 'pm-007',
    title: 'Business Analyst',
    description: 'Analyze business needs, gather and document requirements, and translate them into functional specifications to support the design and delivery of effective technology and process solutions. Collaborate with stakeholders, product owners, developers, and QA teams to understand goals, identify gaps, and propose data-driven recommendations. Use tools such as Jira, Confluence, Visio, and Excel to create user stories, process flows, and requirement documents. Support testing, validation, and change management efforts to ensure solutions align with business objectives and deliver measurable value.',
    category: 'Project & Product Management'
  },
  {
    id: 'uiux-001',
    title: 'UI Designer',
    description: 'Design visually engaging and user-friendly interfaces that enhance user experience across web and mobile applications. Collaborate with UX designers, product managers, and developers to translate requirements and wireframes into high-fidelity mockups, prototypes, and final UI designs. Use tools such as Figma, Adobe XD, Sketch, or Photoshop to create consistent design systems, responsive layouts, and interactive components. Ensure visual alignment with brand guidelines, accessibility standards, and usability best practices to deliver intuitive and aesthetically pleasing digital experiences.',
    category: 'UI/UX & Design'
  },
    {
    id: 'uiux-002',
    title: 'UX Designer',
    description: 'Research, design, and optimize user experiences to ensure intuitive, efficient, and accessible interactions across digital products. Collaborate with product managers, UI designers, developers, and stakeholders to understand user needs, define user journeys, and create wireframes, prototypes, and interaction flows. Conduct user research, usability testing, and data analysis to validate design decisions and continuously improve the product experience. Use tools like Figma, Adobe XD, Sketch, or Axure to design and iterate on user-centered solutions that align with business goals and enhance overall user satisfaction.',
    category: 'UI/UX & Design'
  },
  {
    id: 'uiux-003',
    title: 'UI/UX Designer',
    description: 'Design and enhance user interfaces and experiences that are both visually appealing and highly functional across web and mobile platforms. Collaborate with product managers, developers, and stakeholders to understand user needs and translate them into intuitive wireframes, prototypes, and high-fidelity UI designs. Conduct user research, create user flows, and perform usability testing to validate and refine design solutions. Use tools like Figma, Adobe XD, Sketch, or InVision to deliver responsive, accessible, and consistent designs that align with business goals and elevate the overall user experience.',
    category: 'UI/UX & Design'
  },
    {
    id: 'uiux-004',
    title: 'Product Designer',
    description: 'Design user-centric digital products by combining UX research, interaction design, and visual design to deliver seamless and impactful user experiences. Collaborate with product managers, engineers, and stakeholders to understand business goals and user needs, then translate them into wireframes, prototypes, and high-fidelity designs. Conduct user research and usability testing to validate design decisions and iterate based on feedback. Use tools like Figma, Sketch, Adobe XD, or InVision to design intuitive interfaces that align with product strategy, accessibility standards, and brand guidelines.',
    category: 'UI/UX & Design'
  },
  {
    id: 'uiux-005',
    title: 'Interaction Designer',
    description: 'Design and optimize interactive elements and user flows to ensure smooth, intuitive, and engaging digital experiences across platforms. Collaborate with UX designers, UI designers, product managers, and developers to create wireframes, prototypes, and interaction models based on user behavior and product goals. Focus on micro-interactions, feedback cues, animations, and transitions that guide users through tasks seamlessly. Use tools like Figma, Adobe XD, Axure, or Principle to craft and communicate interactive design solutions that align with usability standards and enhance overall user engagement.',
    category: 'UI/UX & Design'
  },
  {
    id: 'uiux-006',
    title: 'Visual Designer',
    description: 'Create visually compelling designs that enhance brand identity and user experience across digital platforms, including websites, mobile apps, and marketing materials. Collaborate with UX/UI designers, product teams, and marketing stakeholders to develop high-fidelity mockups, graphics, and visual assets aligned with design systems and brand guidelines. Use tools such as Adobe Creative Suite, Figma, Sketch, or Illustrator to produce clean, modern, and engaging visual compositions. Focus on layout, typography, color theory, and visual hierarchy to communicate ideas effectively and elevate the aesthetic quality of digital products.',
    category: 'UI/UX & Design'
  },
  {
    id: 'uiux-007',
    title: 'UX Researcher',
    description: 'Plan and conduct user research to gather insights that inform product design, strategy, and user experience decisions. Collaborate with designers, product managers, and developers to identify research goals, select appropriate methodologies, and translate findings into actionable recommendations. Use qualitative and quantitative research methods such as user interviews, usability testing, surveys, A/B testing, and analytics to understand user behavior, needs, and pain points. Communicate insights through reports, personas, and journey maps to ensure that design and product decisions are grounded in real user data.',
    category: 'UI/UX & Design'
  },
  {
    id: 'uiux-008',
    title: 'Graphic Designer',
    description: 'Create visually engaging graphics and visual content for digital and print media to effectively communicate brand messages and support marketing, product, and communication goals. Collaborate with marketing teams, content creators, and product designers to develop creative assets such as social media graphics, banners, brochures, presentations, logos, and infographics. Use tools like Adobe Photoshop, Illustrator, InDesign, and Figma to produce high-quality designs that align with brand identity, visual hierarchy, and design best practices. Ensure consistency, clarity, and visual appeal across all deliverables.',
    category: 'UI/UX & Design'
  },
  {
    id: 'it-001',
    title: 'IT Support Engineer',
    description: 'Provide technical support and troubleshooting assistance to end-users, ensuring smooth operation of hardware, software, networks, and IT systems. Collaborate with IT teams to diagnose and resolve issues related to desktops, laptops, operating systems, printers, and enterprise applications. Install, configure, and maintain IT equipment, manage user accounts, and support onboarding/offboarding processes. Use ticketing systems like ServiceNow, Jira, or Zendesk to track issues, document resolutions, and ensure timely response in accordance with SLAs. Educate users on IT best practices, security policies, and system usage to enhance productivity and reduce downtime.',
    category: 'IT Support & System Roles'
  },
  {
    id: 'it-002',
    title: 'System Administrator',
    description: 'Install, configure, and maintain servers, operating systems, and IT infrastructure to ensure the stability, security, and efficiency of enterprise environments. Collaborate with IT, security, and development teams to manage user accounts, system backups, software updates, and hardware provisioning. Monitor system performance, troubleshoot issues, and implement preventative measures to minimize downtime. Work with tools and technologies such as Windows Server, Linux, Active Directory, VMware, and cloud platforms to support hybrid or on-premise environments. Ensure compliance with IT policies, security standards, and disaster recovery plans.',
    category: 'IT Support & System Roles'
  },
   {
    id: 'it-003',
    title: 'Desktop Support Engineer',
    description: 'Provide technical assistance to end-users by diagnosing and resolving issues related to desktops, laptops, peripherals, and software applications. Install, configure, and maintain hardware, operating systems, and standard software across user workstations. Collaborate with IT teams to support network connectivity, email configuration, printer setup, and user account management. Use ticketing systems to log, track, and resolve incidents efficiently while ensuring a high level of customer satisfaction. Perform routine maintenance, updates, and security checks to ensure optimal performance and compliance with IT policies.',
    category: 'IT Support & System Roles'
  },
     {
    id: 'it-004',
    title: 'Helpdesk Technician',
    description: 'Serve as the first point of contact for users seeking technical assistance via phone, email, or ticketing systems. Troubleshoot and resolve issues related to hardware, software, network connectivity, user accounts, and common enterprise applications. Escalate complex problems to appropriate IT teams while maintaining ownership of support requests until resolution. Document incidents, solutions, and user interactions to ensure accurate records and knowledge sharing. Provide clear guidance to users, follow standard operating procedures, and contribute to improving helpdesk workflows and service quality.',
    category: 'IT Support & System Roles'
  },
  {
    id: 'it-005',
    title: 'Network Administrator',
    description: 'Design, configure, and maintain local area networks (LANs), wide area networks (WANs), and other networking systems to ensure secure and reliable connectivity across the organization. Monitor network performance, diagnose connectivity issues, and implement solutions to optimize speed, uptime, and security. Manage routers, switches, firewalls, VPNs, and wireless infrastructure, ensuring compliance with network policies and protocols. Collaborate with IT and security teams to enforce access controls, perform regular backups, and implement disaster recovery strategies. Utilize tools like Cisco IOS, Wireshark, SolarWinds, or Nagios to monitor and manage network health.',
    category: 'IT Support & System Roles'
  },
  {
    id: 'it-006',
    title: 'Technical Support Engineer',
    description: 'Provide advanced technical assistance to customers or internal users by troubleshooting complex software, hardware, and system issues. Analyze logs, replicate problems, and collaborate with development or engineering teams to resolve bugs, configuration errors, and performance bottlenecks. Deliver timely solutions through phone, email, chat, or remote tools while ensuring high levels of customer satisfaction. Document technical knowledge in the form of knowledge base articles and user guides. Support product deployments, perform root cause analysis, and help improve product reliability by capturing user feedback and reporting recurring issues.',
    category: 'IT Support & System Roles'
  },
  {
    id: 'sales-001',
    title: 'Technical Sales Engineer',
    description: 'Bridge the gap between technical expertise and customer needs by providing pre-sales and post-sales technical support for complex products and solutions. Collaborate with sales teams to understand client requirements, deliver tailored product demonstrations, and create technical proposals that align with business goals. Assist in solution design, proof of concept development, and customer onboarding to ensure successful adoption. Maintain deep knowledge of the company’s products, industry standards, and competitor offerings. Act as a trusted advisor, translating technical features into business value and helping drive revenue growth through strategic customer engagement.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'sales-002',
    title: 'Solutions Architect',
    description: 'Design and architect scalable, secure, and cost-effective technology solutions that align with business objectives and technical requirements. Collaborate with stakeholders, including product managers, developers, and clients, to gather requirements, define system architecture, and select appropriate technologies. Develop high-level design documents, integration strategies, and implementation roadmaps across cloud, on-premise, or hybrid environments. Ensure solutions are aligned with enterprise architecture standards and support long-term scalability, security, and performance goals. Guide development teams during implementation and serve as a technical advisor throughout the solution lifecycle.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'sales-003',
    title: 'Customer Success Engineer',
    description: 'Act as a technical liaison between customers and internal teams to ensure successful onboarding, adoption, and ongoing satisfaction with software products or solutions. Collaborate with sales, support, and engineering teams to understand customer needs, troubleshoot issues, and deliver tailored technical guidance. Provide training, best practices, and proactive recommendations to help customers maximize product value and achieve their business objectives. Monitor customer health metrics, gather feedback, and drive continuous improvement initiatives to enhance the overall customer experience and reduce churn.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'sales-004',
    title: 'Pre-Sales Consultant',
    description: 'Collaborate with sales teams and prospective clients to understand business requirements and present tailored technology solutions that address customer needs. Conduct product demonstrations, technical presentations, and proof-of-concept activities to showcase solution capabilities and value propositions. Work closely with product, engineering, and delivery teams to design feasible, scalable solutions and respond to RFPs and RFIs. Provide expert guidance on solution architecture, integration, and deployment considerations to support the sales cycle and drive customer acquisition.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'sales-005',
    title: 'CRM Specialist',
    description: 'Manage and optimize Customer Relationship Management (CRM) systems to support marketing, sales, and customer service operations. Configure and maintain CRM platforms such as Salesforce, HubSpot, or Zoho to ensure accurate data capture, workflow automation, and campaign tracking. Collaborate with cross-functional teams to define CRM requirements, implement integrations, and improve user adoption. Analyze customer data to generate insights, enhance segmentation, and support targeted outreach strategies. Ensure data integrity, manage user permissions, and deliver reports that support business decision-making and customer engagement goals.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'sales-006',
    title: 'Digital Marketing Specialist',
    description: 'Plan, execute, and optimize digital marketing campaigns across various channels including search engines, social media, email, and display advertising. Leverage tools like Google Ads, Meta Ads, SEO platforms, and marketing automation systems to drive traffic, generate leads, and increase brand visibility. Analyze campaign performance using tools such as Google Analytics and provide actionable insights to improve ROI. Collaborate with content creators, designers, and developers to produce compelling digital assets and landing pages. Stay current with digital marketing trends and best practices to ensure effective audience engagement and competitive advantage.',
    category: 'Sales, Marketing & Client-Facing Tech Roles'
  },
  {
    id: 'research-001',
    title: 'Research Scientist',
    description: 'Conduct innovative research and experiments to develop new knowledge, technologies, or products within a specialized domain such as artificial intelligence, life sciences, materials science, or data science. Design and execute studies, analyze results using advanced methodologies, and publish findings in peer-reviewed journals or technical reports. Collaborate with cross-functional teams including engineers, analysts, and academic partners to translate research into practical applications. Stay up to date with the latest scientific advancements and contribute to the development of prototypes, patents, or strategic initiatives that drive innovation and problem-solving.',
    category: 'Research & Innovation'
  },
  {
    id: 'research-002',
    title: 'R&D Software Engineer',
    description: 'Design and develop innovative software solutions through research-driven methodologies to solve complex technical challenges and explore emerging technologies. Collaborate with product teams, data scientists, and researchers to prototype, experiment, and validate new concepts. Implement advanced algorithms, develop proof-of-concepts, and contribute to the architectural evolution of next-generation products. Stay abreast of academic and industry trends to integrate cutting-edge technologies into practical software applications. Document findings, publish internal research, and contribute to intellectual property through patents or technical papers.',
    category: 'Research & Innovation'
  },
  {
    id: 'research-003',
    title: 'Algorithm Engineer',
    description: 'Design, develop, and optimize algorithms to solve complex computational problems in domains such as machine learning, computer vision, data processing, or signal processing. Collaborate with data scientists, software engineers, and domain experts to translate real-world problems into efficient, scalable algorithmic solutions. Analyze algorithm performance, improve accuracy and efficiency, and ensure integration with production systems. Leverage mathematical modeling, data structures, and advanced programming techniques to implement high-performance solutions. Stay updated on the latest research and advancements to drive continuous innovation in algorithm design.',
    category: 'Research & Innovation'
  },
  {
    id: 'misc-001',
    title: 'Blockchain Developer',
    description: 'Design, develop, and maintain decentralized applications (dApps) and smart contracts on blockchain platforms such as Ethereum, Solana, or Hyperledger. Implement secure and efficient blockchain protocols, consensus algorithms, and cryptographic techniques to ensure data integrity and trustless transactions. Collaborate with product managers, backend developers, and security teams to integrate blockchain solutions with existing systems. Write and test smart contracts using languages like Solidity or Rust, and deploy them on public or private blockchains. Stay current with evolving blockchain technologies, token standards, and Web3 frameworks to drive innovation in decentralized ecosystems.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-002',
    title: 'AR/VR Developer',
    description: 'Design, develop, and optimize immersive Augmented Reality (AR) and Virtual Reality (VR) applications using engines like Unity or Unreal Engine. Work with 3D models, spatial computing, and real-time rendering to build interactive experiences for platforms such as Oculus, HoloLens, ARKit, and ARCore. Collaborate with designers, 3D artists, and product teams to integrate visual assets, physics, and intuitive user interactions. Implement advanced features like motion tracking, hand gestures, and spatial audio to enhance realism and engagement. Stay updated on the latest AR/VR hardware and development frameworks to push the boundaries of immersive technology.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-003',
    title: 'Game Designer',
    description: 'Design engaging gameplay mechanics, storylines, level layouts, and user experiences that align with the creative vision of the game. Collaborate closely with artists, developers, and producers to translate ideas into playable features and balanced game systems. Create detailed game design documents, wireframes, and prototypes to guide development. Analyze player behavior and feedback to refine gameplay loops, difficulty curves, and user engagement strategies. Stay current with industry trends, gaming technologies, and player expectations to deliver innovative and immersive gaming experiences across various platforms.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-004',
    title: 'IOT Developer',
    description: 'Design, develop, and deploy Internet of Things (IoT) applications that connect and manage smart devices through cloud platforms and edge computing. Work with embedded systems, microcontrollers (e.g., Arduino, Raspberry Pi, ESP32), and communication protocols like MQTT, BLE, Zigbee, and LoRaWAN. Collaborate with hardware engineers, cloud architects, and data scientists to enable real-time data collection, processing, and remote control of devices. Implement secure and scalable IoT solutions across domains such as smart homes, industrial automation, healthcare, and agriculture. Stay updated on IoT platforms, sensor technologies, and cybersecurity best practices to build reliable connected systems.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-005',
    title: 'Robotics Software Engineer',
    description: 'Design, develop, and maintain software systems that control and automate robotic systems across various platforms and environments. Work with frameworks like ROS (Robot Operating System) to implement algorithms for perception, localization, motion planning, and control. Collaborate with mechanical, electrical, and embedded engineers to integrate sensors, actuators, and microcontrollers for real-time robotic operations. Develop simulations, test suites, and visualization tools to validate robot behavior in both virtual and physical environments. Stay current with advancements in robotics, computer vision, AI, and machine learning to enhance autonomy, adaptability, and performance of robotic systems.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-006',
    title: 'Firmware Developer',
    description: 'Design, develop, and optimize low-level software (firmware) that directly controls hardware components in embedded systems. Program microcontrollers and SoCs using languages like C/C++ and assembly to enable real-time performance and hardware interaction. Collaborate with hardware engineers to bring up new boards, debug hardware-software integration issues, and implement communication protocols such as I2C, SPI, UART, and CAN. Ensure reliability, efficiency, and security of firmware by writing unit tests, performing hardware-in-the-loop (HIL) testing, and conducting code reviews. Stay current with advancements in embedded systems, RTOS, and IoT to deliver high-performance, energy-efficient firmware solutions across consumer electronics, automotive, medical, and industrial applications.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-007',
    title: 'Low-code/No-code Developer',
    description: 'Design, develop, and deploy business applications using low-code/no-code platforms such as Microsoft Power Apps, OutSystems, Mendix, AppSheet, or Bubble. Collaborate with business analysts and stakeholders to gather requirements and quickly prototype solutions that automate workflows, manage data, and enhance user experience. Leverage built-in tools and visual programming to integrate APIs, databases, and third-party services without extensive traditional coding. Ensure scalability, performance, and data security while reducing development time and costs. Stay current with platform updates, best practices, and governance standards to deliver agile, user-friendly enterprise-grade applications.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-008',
    title: 'SAP Consultant / ERP Specialist',
    description: 'Analyze, design, and implement enterprise resource planning (ERP) solutions, with a focus on SAP modules such as SAP FI/CO, MM, SD, HCM, or S/4HANA. Collaborate with business stakeholders to gather requirements, configure systems, and optimize end-to-end business processes across finance, supply chain, HR, and operations. Provide expert guidance during system upgrades, data migrations, and integrations with third-party tools. Develop functional specifications, conduct testing, and deliver user training to ensure successful deployment and adoption. Stay updated with SAP best practices, new technologies, and industry standards to drive digital transformation and operational efficiency.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-009',
    title: 'Mainframe Developer',
    description: 'Design, develop, and maintain enterprise-scale applications on mainframe systems using languages such as COBOL, JCL, PL/I, and assembler. Work with databases like DB2, IMS, and VSAM to build robust, high-performance solutions for financial, insurance, healthcare, or government systems. Collaborate with business analysts and operations teams to gather requirements, debug legacy code, optimize batch processes, and ensure seamless integration with modern platforms. Perform code reviews, testing, and performance tuning to support mission-critical applications with high availability and security. Stay updated with modernization strategies, including mainframe-to-cloud migrations and hybrid system integrations.',
    category: 'Miscellaneous / Specialized Roles'
  },
  {
    id: 'misc-010',
    title: 'QA Compliance Analyst',
    description: 'Ensure software development processes and deliverables comply with internal quality standards, regulatory requirements, and industry best practices. Collaborate with QA teams, developers, and regulatory stakeholders to review documentation, validate testing procedures, and conduct audits. Monitor adherence to compliance frameworks such as ISO 9001, FDA (21 CFR Part 11), HIPAA, or SOX, depending on the industry. Identify gaps, recommend corrective actions, and support continuous improvement initiatives across the software development lifecycle. Maintain traceability matrices, risk assessments, and validation plans to ensure quality and regulatory readiness of software products.',
    category: 'Miscellaneous / Specialized Roles'
  }
];


function JobDescriptionPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Roles');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Starts collapsed

  const navigate = useNavigate();

  const filteredJobDescriptions = selectedCategory === 'All Roles'
    ? frontendJobDescriptions
    : frontendJobDescriptions.filter(job => job.category === selectedCategory);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleTestResultsClick = () => {
    navigate('/analyze');
  };

  return (
    <div className="job-description-page-wrapper">
      <NavBar onToggleSidebar={toggleSidebar} /> 

      <div className={`job-description-main-layout ${isSidebarExpanded ? '' : 'sidebar-collapsed'}`}>
        <SideNavBar 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
          isExpanded={isSidebarExpanded} 
          onToggleSidebar={toggleSidebar} 
        />

        <div className="job-description-content">
          <h1 className="page-title">Available Job Descriptions</h1>

          <div className="job-descriptions-grid">
            {filteredJobDescriptions.length > 0 ? (
              filteredJobDescriptions.map((job) => (
                <div key={job.id} className="job-card">
                  <h2>{job.title}</h2>
                  {/* KEY CHANGE: Removed substring and '...' from description, and changed class name */}
                  <p className="job-full-description">{job.description}</p> 
                  <button className="test-results-btn" onClick={handleTestResultsClick}>
                    Test Your Results
                  </button>
                </div>
              ))
            ) : (
              <p className="no-jobs-message">No job roles found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionPage;
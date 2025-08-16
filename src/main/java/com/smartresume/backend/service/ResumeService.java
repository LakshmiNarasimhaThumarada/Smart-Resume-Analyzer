package com.smartresume.backend.service;

import com.smartresume.backend.model.ResumeMatch;
import com.smartresume.backend.repository.ResumeMatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static java.util.Map.entry;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeMatchRepository repository;

    @Autowired
    public ResumeService(ResumeMatchRepository repository) {
        this.repository = repository;
    }

    // A new class to hold the detailed matching results
    public static class MatchingResult {
        private int matchScore;
        private List<String> matchedSkills;
        private List<String> unmatchedSkills;

        public MatchingResult(int matchScore, List<String> matchedSkills, List<String> unmatchedSkills) {
            this.matchScore = matchScore;
            this.matchedSkills = matchedSkills;
            this.unmatchedSkills = unmatchedSkills;
        }

        // Getters
        public int getMatchScore() { return matchScore; }
        public List<String> getMatchedSkills() { return matchedSkills; }
        public List<String> getUnmatchedSkills() { return unmatchedSkills; }
    }

    // ==== Role to Skills Mapping (Shortened Example) ====
    private static final Map<String, List<String>> ROLE_SKILLS_MAP = Map.ofEntries(
            // 1. Software Development Roles
            entry("frontend developer", List.of(
                "html5", "css3","html","css", "javascript", "react.js", "angular", "vue.js", "svelte", "jquery", "redux", "vuex",
                "ngrx", "webpack", "babel", "vite", "git", "responsive design", "ui/ux principles", "accessibility",
                "jest", "cypress", "enzyme", "browser dev tools"
            )),
            entry("backend developer", List.of(
                "java", "spring boot", "node.js", "express.js", "python", "django", "flask", "go", "c#", "ruby on rails",
                "php", "sql", "postgresql", "mysql", "oracle", "sql server", "mongodb", "cassandra", "redis",
                "dynamodb", "restful apis", "graphql", "grpc", "git", "nginx", "apache", "tomcat", "aws", "azure",
                "gcp", "docker", "kubernetes", "oauth", "jwt", "unit testing", "integration testing", "rabbitmq", "kafka"
            )),
            entry("full stack developer", List.of(
                "html", "css", "javascript", "react", "angular", "vue", "node.js", "python", "java", "spring boot",
                "django", "express", "sql", "nosql", "rest api", "git", "docker", "kubernetes", "aws", "azure", "gcp",
                "ci/cd", "system architecture"
            )),
            entry("web developer", List.of(
                "html", "css", "javascript", "http/https", "web servers", "database fundamentals", "git"
            )),
            entry("mobile app developer", List.of(
                "kotlin", "swift", "objective-c", "flutter", "dart", "react native", "android sdk", "ios sdk", "xcode",
                "android studio", "firebase", "sqlite", "realm", "core data", "ui/ux mobile", "api integration"
            )),
            entry("desktop application developer", List.of(
                "c++", "c#", "java", "python", ".net", "wpf", "winforms", "uwp", "swift", "objective-c", "cocoa", "qt",
                "electron", "javafx", "gtk", "kivy", "operating systems", "performance optimization"
            )),
            entry("game developer", List.of(
                "unity", "c#", "unreal engine", "c++", "godot", "lua", "game physics", "linear algebra", "opengl",
                "directx", "vulkan", "shaders", "game ai", "networking", "perforce", "blender", "maya"
            )),
            entry("embedded software engineer", List.of(
                "c", "c++", "assembly", "microcontrollers", "arm", "pic", "avr", "rtos", "freertos", "vxworks",
                "hardware knowledge", "spi", "i2c", "uart", "can", "ethernet", "jtag", "oscilloscope",
                "low-level programming"
            )),
            entry("api developer", List.of(
                "python", "node.js", "java", "go", "rest api design", "graphql", "grpc", "openapi", "swagger", "postman",
                "api security", "oauth", "jwt", "api gateway", "scalability", "performance"
            )),

            // 2. Data & AI Roles
            entry("data scientist", List.of(
                "python", "r", "pandas", "numpy", "scikit-learn", "matplotlib", "seaborn", "tensorflow", "pytorch",
                "keras", "machine learning", "deep learning", "statistics", "sql", "data cleaning", "data visualization",
                "hypothesis testing", "big data", "aws sagemaker", "azure ml", "google ai platform", "communication"
            )),
            entry("data analyst", List.of(
                "sql", "excel", "tableau", "power bi", "google data studio", "python", "pandas", "data visualization",
                "data cleaning", "statistical concepts", "reporting", "business acumen"
            )),
            entry("data engineer", List.of(
                "python", "java", "scala", "go", "sql", "nosql", "hadoop", "spark", "flink", "etl", "data warehousing",
                "aws glue", "azure data factory", "google cloud dataflow", "bigquery", "apache airflow", "kafka",
                "data modeling", "data governance"
            )),
            entry("machine learning engineer", List.of(
                "python", "tensorflow", "pytorch", "keras", "scikit-learn", "deep learning", "ml algorithms",
                "feature engineering", "mlops", "model deployment", "mathematics", "software engineering",
                "aws sagemaker", "azure ml", "google ai platform"
            )),
            entry("ai engineer", List.of(
                "machine learning", "deep learning", "nlp", "computer vision", "reinforcement learning", "algorithm design",
                "python", "pytorch", "tensorflow", "data structures", "software development", "cloud ai services"
            )),
            entry("business intelligence developer", List.of(
                "sql", "etl", "ssis", "talend", "informatica", "data warehousing", "tableau", "power bi", "qlikview",
                "sap businessobjects", "cognos", "data modeling", "dashboard development", "business acumen"
            )),
            entry("nlp engineer", List.of(
                "python", "nltk", "spacy", "hugging face transformers", "linguistics", "machine learning for nlp",
                "deep learning for nlp", "rnn", "lstm", "transformers", "text preprocessing", "pytorch", "tensorflow"
            )),
            entry("computer vision engineer", List.of(
                "python", "c++", "opencv", "scikit-image", "linear algebra", "image processing", "cnn",
                "object detection", "image segmentation", "tensorflow", "pytorch", "3d vision"
            )),
            entry("big data engineer", List.of(
                "java", "scala", "python", "hadoop", "hdfs", "mapreduce", "yarn", "hive", "spark", "nosql",
                "cassandra", "hbase", "mongodb", "etl", "aws emr", "azure hdinsight", "google cloud dataproc", "kafka"
            )),

            // 3. DevOps & Infrastructure
            entry("devops engineer", List.of(
                "git", "jenkins", "gitlab ci", "github actions", "azure devops", "circleci", "aws", "azure", "gcp",
                "docker", "kubernetes", "terraform", "ansible", "chef", "puppet", "cloudformation", "bash", "python",
                "powershell", "prometheus", "grafana", "elk stack", "linux", "ci/cd", "automation"
            )),
            entry("site reliability engineer", List.of(
                "linux sysadmin", "python", "go", "java", "c++", "distributed systems", "monitoring", "alerting",
                "slis", "slos", "incident management", "troubleshooting", "automation", "docker", "kubernetes",
                "networking", "cloud platforms"
            )),
            entry("cloud engineer", List.of(
                "aws", "azure", "gcp", "terraform", "cloudformation", "azure resource manager", "google deployment manager",
                "ec2", "s3", "vpc", "lambda", "rds", "vms", "blob storage", "virtual networks", "azure functions",
                "cloud sql", "compute engine", "cloud storage", "kubernetes", "eks", "aks", "gke", "security",
                "iam", "networking", "scripting"
            )),
            entry("build and release engineer", List.of(
                "ci/cd", "git", "maven", "gradle", "npm", "yarn", "dotnet build", "make", "bash", "python", "powershell",
                "ansible", "docker", "kubernetes", "deployment strategies"
            )),
            entry("infrastructure engineer", List.of(
                "linux", "windows server", "vmware", "hyper-v", "kvm", "networking", "tcp/ip", "dns", "dhcp", "routing",
                "firewalls", "vpns", "storage systems", "san", "nas", "object storage", "servers", "bash", "python",
                "powershell", "ansible", "chef", "puppet", "cloud iaas", "security best practices"
            )),
            entry("platform engineer", List.of(
                "software engineering", "go", "python", "java", "kubernetes", "container orchestration",
                "cloud-native technologies", "api design", "ci/cd", "observability", "monitoring", "logging", "tracing",
                "database knowledge", "security principles"
            )),
            entry("systems administrator", List.of(
                "linux", "windows server", "networking", "dns", "dhcp", "routing", "firewalls", "vpns", "server hardware",
                "scripting", "bash", "powershell", "virtualization", "active directory", "ldap", "backup & recovery",
                "security", "mail servers", "web servers"
            )),

            // 4. Quality Assurance & Testing
            entry("qa engineer", List.of(
                "test methodologies", "black box testing", "white box testing", "test case design", "defect management",
                "functional testing", "regression testing", "sanity testing", "smoke testing", "integration testing",
                "sql", "sdlc", "stlc", "jira", "testrail", "alm", "browser dev tools"
            )),
            entry("manual tester", List.of(
                "test case execution", "defect identification", "exploratory testing", "requirements analysis",
                "user empathy", "regression testing"
            )),
            entry("automation tester", List.of(
                "python", "java", "javascript", "c#", "selenium webdriver", "cypress", "playwright", "testcafe",
                "appium", "junit", "testng", "pytest", "mocha", "jasmine", "ci/cd integration", "git", "postman",
                "soapui", "sql"
            )),
            entry("performance tester", List.of(
                "jmeter", "loadrunner", "gatling", "k6", "performance metrics", "workload modeling",
                "load generation", "prometheus", "grafana", "appdynamics", "dynatrace", "networking fundamentals",
                "database performance"
            )),
            entry("test architect", List.of(
                "testing methodologies", "automation framework design", "tool selection", "test strategy",
                "performance testing", "security testing", "cloud testing", "leadership", "mentorship", "coding skills"
            )),
            entry("sdet (software development engineer in test)", List.of(
                "software development", "programming languages", "automation framework development", "unit testing",
                "integration testing", "api testing", "performance testing", "ci/cd", "code review", "debugging", "git"
            )),

            // 5. Cybersecurity & Networking
            entry("security engineer", List.of(
                "network security", "firewalls", "ids/ips", "vpns", "waf", "endpoint security", "antivirus", "edr",
                "cloud security", "aws security hub", "azure security center", "gcp security command center",
                "vulnerability management", "incident response", "iam", "sso", "mfa", "active directory",
                "cryptography", "siem", "splunk", "qradar", "elk stack", "python", "bash", "gdpr", "hipaa", "soc 2",
                "iso 27001", "threat intelligence"
            )),
            entry("ethical hacker / penetration tester", List.of(
                "metasploit", "nmap", "burp suite", "wireshark", "kali linux", "network protocols", "web application security",
                "owasp top 10", "vulnerability assessment", "exploitation", "python", "bash", "powershell", "social engineering"
            )),
            entry("network security engineer", List.of(
                "tcp/ip", "dns", "dhcp", "routing protocols", "firewalls", "palo alto", "cisco asa", "check point",
                "ids/ips", "vpn technologies", "network access control", "wireless security", "siem", "ddos mitigation",
                "packet analysis", "wireshark", "cloud networking"
            )),
            entry("soc analyst", List.of(
                "security monitoring", "alert triage", "siem tools", "splunk", "qradar", "sentinel", "incident response",
                "threat intelligence", "forensics", "vulnerability management", "networking fundamentals",
                "operating system security", "malware analysis"
            )),
            entry("information security analyst", List.of(
                "risk assessment", "compliance frameworks", "nist", "iso 27001", "gdpr", "hipaa", "security policies",
                "vulnerability management", "security auditing", "incident response planning", "vendor security"
            )),
            entry("iam engineer (identity & access management)", List.of(
                "iam concepts", "authentication", "authorization", "provisioning", "federation", "okta", "azure ad",
                "ping identity", "sailpoint", "oauth", "saml", "openid connect", "ldap", "kerberos", "mfa", "pam",
                "aws iam", "gcp iam", "scripting"
            )),
            entry("cryptography engineer", List.of(
                "cryptographic primitives", "encryption", "hashing", "digital signatures", "tls/ssl", "ipsec",
                "key management", "pki", "c", "c++", "java", "python", "mathematics"
            )),
            entry("risk & compliance analyst", List.of(
                "compliance frameworks", "gdpr", "ccpa", "hipaa", "pci dss", "soc 2", "iso 27001", "risk assessment",
                "audit procedures", "policy development", "data governance", "business impact analysis"
            )),

            // 6. Database & Storage
            entry("database administrator", List.of(
                "mysql", "postgresql", "oracle", "sql server", "mongodb", "sql", "query optimization",
                "database design", "performance tuning", "backup & recovery", "security", "high availability",
                "disaster recovery", "monitoring tools", "bash", "python"
            )),
            entry("database developer", List.of(
                "sql", "pl/sql", "t-sql", "database design", "schema design", "performance optimization",
                "stored procedures", "functions", "triggers", "data modeling", "etl", "git"
            )),
            entry("data warehouse engineer", List.of(
                "data warehousing methodologies", "kimball", "inmon", "etl tools", "informatica", "talend", "ssis",
                "datastage", "python", "sql", "data modeling", "dimensional modeling", "star schema", "snowflake schema",
                "aws redshift", "google bigquery", "azure synapse analytics", "snowflake", "data governance"
            )),
            entry("elt developer", List.of(
                "etl tools", "informatica powercenter", "talend", "ssis", "datastage", "pentaho", "sql", "python",
                "shell scripting", "database concepts", "data profiling", "data mapping", "job scheduling",
                "apache airflow", "data validation"
            )),
            entry("nosql specialist", List.of(
                "mongodb", "cassandra", "redis", "couchbase", "neo4j", "dynamodb", "nosql data modeling",
                "database configuration", "scalability", "replication", "sharding", "cloud nosql services"
            )),

            // 7. Project & Product Management
            entry("product manager", List.of(
                "market research", "user research", "product strategy", "roadmap development", "requirements gathering",
                "prioritization", "agile", "scrum", "jira", "feature definition", "backlog management", "technical understanding",
                "data analysis", "go-to-market strategy", "leadership", "communication"
            )),
            entry("project manager", List.of(
                "project planning", "scheduling", "risk management", "budget management", "resource allocation",
                "stakeholder management", "communication", "reporting", "waterfall", "agile", "scrum", "kanban",
                "jira", "asana", "trello", "microsoft project", "problem-solving"
            )),
            entry("program manager", List.of(
                "strategic planning", "portfolio management", "cross-functional leadership", "risk management",
                "budget oversight", "stakeholder alignment", "executive reporting", "business objectives"
            )),
            entry("scrum master", List.of(
                "scrum framework", "facilitation", "coaching", "mentoring", "impediment removal", "conflict resolution",
                "team protection", "metrics tracking", "burndown charts", "servant leadership"
            )),
            entry("agile coach", List.of(
                "agile methodologies", "scrum", "kanban", "lean", "safe", "coaching", "training",
                "organizational change management", "leadership", "mentoring", "facilitation", "metrics"
            )),
            entry("delivery manager", List.of(
                "project delivery", "program delivery", "resource management", "stakeholder management",
                "risk management", "quality assurance", "budget control", "client relationship management",
                "agile", "waterfall", "team leadership"
            )),
            entry("business analyst", List.of(
                "requirements elicitation", "user stories", "use cases", "functional specifications",
                "process modeling", "bpmn", "flowcharts", "data modeling", "stakeholder analysis", "communication",
                "problem-solving", "analytical thinking", "domain knowledge", "jira", "confluence", "visio"
            )),

            // 8. UI/UX & Design
            entry("ui designer", List.of(
                "user research", "wireframing", "prototyping", "figma", "sketch", "adobe xd", "axure rp",
                "information architecture", "user flows", "journey mapping", "usability principles",
                "interaction design", "visual design", "typography", "color theory", "layout", "ui kits",
                "style guides", "front-end basics", "accessibility", "wcag"
            )),
            entry("ux designer", List.of(
                "user research", "wireframing", "prototyping", "figma", "sketch", "adobe xd", "axure rp",
                "information architecture", "user flows", "journey mapping", "usability principles",
                "interaction design", "visual design", "typography", "color theory", "layout", "ui kits",
                "style guides", "front-end basics", "accessibility", "wcag"
            )),
            entry("ui/ux designer", List.of(
                "user research", "wireframing", "prototyping", "figma", "sketch", "adobe xd", "axure rp",
                "information architecture", "user flows", "journey mapping", "usability principles",
                "interaction design", "visual design", "typography", "color theory", "layout", "ui kits",
                "style guides", "front-end basics", "accessibility", "wcag"
            )),
            entry("product designer", List.of(
                "end-to-end design", "user research", "product strategy", "ui/ux design", "prototyping", "testing",
                "data analysis", "cross-functional collaboration", "business acumen", "presentation", "storytelling"
            )),
            entry("interaction designer", List.of(
                "human-computer interaction", "user flows", "task analysis", "prototyping", "animation",
                "usability testing", "feedback loops", "psychology of user behavior", "figma", "principle", "after effects"
            )),
            entry("visual designer", List.of(
                "graphic design principles", "layout", "composition", "color theory", "typography",
                "adobe photoshop", "illustrator", "indesign", "figma", "sketch", "branding", "iconography",
                "illustration", "web ui", "mobile ui", "print design"
            )),
            entry("ux researcher", List.of(
                "research methodologies", "qualitative research", "interviews", "usability testing", "ethnography",
                "quantitative research", "surveys", "analytics", "data analysis", "statistical concepts", "reporting",
                "recruitment", "research ethics", "survey platforms"
            )),
            entry("graphic designer", List.of(
                "adobe photoshop", "illustrator", "indesign", "typography", "color theory", "layout", "composition",
                "branding", "logo design", "illustration", "print production", "digital asset creation"
            )),

            // 9. IT Support & System Roles
            entry("it support engineer", List.of(
                "windows os", "macos", "linux basics", "hardware troubleshooting", "networking fundamentals",
                "tcp/ip", "wi-fi", "software installation", "ticketing systems", "jira service management",
                "zendesk", "servicenow", "active directory", "remote support tools", "backup & recovery", "security best practices"
            )),
            entry("system administrator", List.of(
                "linux", "windows server", "server management", "networking", "dns", "dhcp", "routing", "firewalls",
                "virtualization", "vmware", "hyper-v", "scripting", "bash", "powershell", "active directory", "ldap",
                "backup & dr", "security hardening", "cloud fundamentals"
            )),
            entry("desktop support engineer", List.of(
                "windows", "macos", "pc hardware", "laptop hardware", "mobile device support",
                "software installation", "printer troubleshooting", "network connectivity", "user account management",
                "remote desktop", "microsoft office"
            )),
            entry("helpdesk technician", List.of(
                "customer service", "troubleshooting", "basic os", "basic software", "password resets",
                "account unlock", "ticketing system usage", "phone etiquette", "problem documentation"
            )),
            entry("network administrator", List.of(
                "tcp/ip", "dns", "dhcp", "vpn", "routing protocols", "routers", "switches", "firewalls",
                "network monitoring", "network security", "wireless networking", "cabling standards"
            )),
            entry("technical support engineer", List.of(
                "product knowledge", "complex troubleshooting", "problem reproduction", "log analysis",
                "database querying", "api understanding", "customer interaction", "de-escalation", "documentation"
            )),

            // 10. Sales, Marketing & Client-Facing Tech Roles
            entry("technical sales engineer", List.of(
                "product knowledge", "sales acumen", "customer needs analysis", "presentation skills",
                "demonstration skills", "competitive analysis", "relationship building", "pre-sales troubleshooting"
            )),
            entry("solutions architect", List.of(
                "broad technical knowledge", "architectural design", "scalability", "security", "reliability",
                "cost-effectiveness", "cloud architecture", "aws", "azure", "gcp", "requirements gathering",
                "stakeholder management", "technical leadership", "communication"
            )),
            entry("customer success engineer", List.of(
                "product expertise", "technical troubleshooting", "customer relationship management",
                "proactive engagement", "training", "onboarding", "customer usage analysis", "feedback collection"
            )),
            entry("pre-sales consultant", List.of(
                "technical product expertise", "solution design", "proposal development", "client presentations",
                "demonstrations", "proof of concept", "competitive awareness", "requirements gathering"
            )),
            entry("crm specialist", List.of(
                "crm platform expertise", "salesforce", "zoho", "configuration", "customization", "data management",
                "user training", "system integration", "business process understanding"
            )),
            entry("digital marketing specialist", List.of(
                "seo", "keyword research", "on-page seo", "technical seo", "link building", "content strategy",
                "sem", "ppc", "google ads", "bing ads", "campaign management", "google analytics", "google search console",
                "semrush", "ahrefs", "content marketing", "social media marketing", "email marketing", "a/b testing"
            )),

            // 11. Research & Innovation
            entry("research scientist", List.of(
                "domain knowledge (ai, quantum computing)", "mathematics", "linear algebra", "calculus", "probability",
                "statistics", "python", "matlab", "julia", "c++", "academic writing", "experimental design",
                "data analysis", "problem formulation", "literature review"
            )),
            entry("r&d software engineer", List.of(
                "programming languages", "c++", "python", "java", "algorithm design", "scientific computing",
                "prototyping", "experimentation", "performance optimization"
            )),
            entry("algorithm engineer", List.of(
                "data structures", "algorithms", "mathematics", "optimization techniques", "complexity analysis",
                "c++", "python", "java", "problem decomposition", "parallel computing"
            )),

            // 12. Miscellaneous / Specialized Roles
            entry("blockchain developer", List.of(
                "solidity", "ethereum", "rust", "go", "python", "c++", "blockchain platforms", "binance smart chain",
                "solana", "polkadot", "hyperledger", "smart contract development", "cryptography", "dapps",
                "consensus mechanisms", "web3.js", "ethers.js", "truffle", "ganache"
            )),
            entry("ar/vr developer", List.of(
                "unity", "c#", "unreal engine", "c++", "webxr", "javascript", "3d graphics", "modeling",
                "spatial computing", "interaction design", "performance optimization", "arcore", "arkit", "openxr"
            )),
            entry("game designer", List.of(
                "game mechanics design", "level design", "narrative design", "storytelling", "system design",
                "prototyping", "player psychology", "game ux", "playtesting", "unity", "unreal engine"
            )),
            entry("iot developer", List.of(
                "c", "c++", "python", "embedded systems", "sensor interfacing", "mqtt", "coap", "http", "bluetooth",
                "zigbee", "raspberry pi", "arduino", "iot protocols", "networking fundamentals", "aws iot core",
                "azure iot hub", "google cloud iot core", "data processing", "iot security"
            )),
            entry("robotics software engineer", List.of(
                "c++", "python", "robot operating system (ros)", "control theory", "kinematics", "dynamics",
                "sensor integration", "lidar", "cameras", "imus", "path planning", "navigation", "computer vision",
                "machine learning for autonomy", "actuator control", "real-time systems"
            )),
            entry("firmware developer", List.of(
                "c", "assembly", "microcontroller architecture", "bare metal", "rtos", "hardware interfacing", "gpio",
                "adc", "dac", "timers", "interrupts", "spi", "i2c", "uart", "can", "debugging tools",
                "oscilloscopes", "logic analyzers", "in-circuit debuggers", "memory management"
            )),
            entry("low-code/no-code developer", List.of(
                "salesforce lightning", "microsoft power apps", "outsystems", "mendix", "bubble", "business process understanding",
                "ui/ux principles", "system integration", "data modeling", "workflow automation", "rapid prototyping"
            )),
            entry("sap consultant / erp specialist", List.of(
                "sap s/4hana", "ecc", "fi/co", "sd", "mm", "pp", "hr", "abap", "business process knowledge",
                "system configuration", "customization", "data migration", "integration", "user training"
            )),
            entry("mainframe developer", List.of(
                "cobol", "pl/i", "jcl", "assembler", "z/os", "mvs", "db2", "ims db", "cics", "ims dc",
                "batch processing", "data structures", "file handling"
            )),
            entry("qa compliance analyst", List.of(
                "gxp", "fda regulations", "iso 13485", "sox", "gdpr", "quality management systems (qms)",
                "documentation", "record keeping", "audit preparation", "risk assessment", "validation", "verification",
                "change control management"
            ))
    );

    // This method is now updated to return the new MatchingResult object
    public MatchingResult calculateMatchScore(String resumeText, String jobRole) {
        String filtered = extractRelevantSections(resumeText);
        Set<String> resumeTokens = normalizeTokens(tokenize(filtered));
        
        List<String> roleSkills = ROLE_SKILLS_MAP.getOrDefault(jobRole.toLowerCase(), List.of());

        // Lists to store matched and unmatched skills
        List<String> matchedSkills = new ArrayList<>();
        List<String> unmatchedSkills = new ArrayList<>();
        
        if (roleSkills.isEmpty()) {
            return new MatchingResult(0, matchedSkills, unmatchedSkills);
        }
        
        int totalWeight = 0;
        int matchWeight = 0;

        for (int i = 0; i < roleSkills.size(); i++) {
            String skill = normalize(roleSkills.get(i));
            int weight;
            if (i < 4) weight = 75;
            else if (i < 10) weight = 25;
            else if (i < 15) weight = 12;
            else weight = 6;

            totalWeight += weight;

            if (resumeTokens.contains(skill)) {
                matchWeight += weight;
                // Add the original skill name to the matched list
                matchedSkills.add(roleSkills.get(i));
            } else {
                // Add the original skill name to the unmatched list
                unmatchedSkills.add(roleSkills.get(i));
            }
        }
        
        int matchScore = Math.round((matchWeight * 100.0f) / totalWeight);

        // Return the new MatchingResult object
        return new MatchingResult(matchScore, matchedSkills, unmatchedSkills);
    }
    
    // This method now accepts and saves the full MatchingResult
    public ResumeMatch saveMatch(String resumeText, String jobDescription, int score, String matchedSkills, String unmatchedSkills) {
        ResumeMatch match = new ResumeMatch(resumeText, jobDescription, score, matchedSkills, unmatchedSkills);
        return repository.save(match);
    }

    public String extractRelevantSections(String fullText) {
        String lower = fullText.toLowerCase();
        StringBuilder result = new StringBuilder();

        if (lower.contains("projects") || lower.contains("project")) {
            int start = lower.indexOf("projects");
            int end = lower.contains("technical skills") ? lower.indexOf("technical skills") : lower.length();
            result.append(fullText.substring(start, end)).append("\n");
        }

        if (lower.contains("technical skills") || lower.contains("skills")) {
            int start = lower.indexOf("technical skills");
            int end = lower.contains("positions of responsibility") ? lower.indexOf("positions of responsibility") : lower.length();
            result.append(fullText.substring(start, end)).append("\n");
        }

        return result.toString();
    }

    private Set<String> tokenize(String text) {
        Set<String> stopWords = Set.of(
            "we", "are", "for", "in", "and", "or", "the", "a", "an", "to", "of", "with", "on", "that", "this",
            "by", "is", "it", "as", "be", "from", "at", "mailto", "com", "www", "linkedin", "gmail"
        );

        return Arrays.stream(text.toLowerCase().split("[^a-z0-9+#.]+"))
                .filter(token -> token.length() > 1 && !stopWords.contains(token))
                .collect(Collectors.toSet());
    }

    // Normalize each token: remove symbols like '.', '#' and lowercase
    private String normalize(String token) {
        return token.replaceAll("[^a-z0-9]", "").toLowerCase();
    }

    // Normalize a full set
    private Set<String> normalizeTokens(Set<String> tokens) {
        return tokens.stream()
                .map(this::normalize)
                .collect(Collectors.toSet());
    }
}
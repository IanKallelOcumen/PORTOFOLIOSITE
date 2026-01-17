import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Code,
  Palette,
  Cpu,
  Wrench,
  Server,
  Award,
  Calendar,
  Download,
  Printer,
} from "lucide-react";

export function Resume() {
  const downloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ian Kallel N. Ocumen - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
    
    .container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
    }
    
    .header {
      background: linear-gradient(to right, #1a1a2e, #2a1a4a, #1a1a2e);
      color: white;
      padding: 40px;
    }
    
    .header h1 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    
    .header .highlight {
      color: #ccff00;
    }
    
    .header .subtitle {
      font-size: 1.25rem;
      color: #d8b4fe;
      margin-bottom: 24px;
      font-weight: 500;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      font-size: 0.875rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .contact-item a {
      color: white;
      text-decoration: none;
    }
    
    .contact-item a:hover {
      color: #ccff00;
    }
    
    .icon {
      color: #ccff00;
      width: 16px;
      height: 16px;
    }
    
    .main-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 32px;
      padding: 40px;
    }
    
    .section {
      margin-bottom: 32px;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #9333ea;
    }
    
    .section-header .bar {
      width: 4px;
      height: 24px;
      background: #ccff00;
    }
    
    .section-header h2 {
      font-size: 1.25rem;
      font-weight: bold;
      color: #1f2937;
      font-family: 'Sora', sans-serif;
    }
    
    .profile-text {
      font-size: 0.875rem;
      color: #374151;
      line-height: 1.8;
    }
    
    .skill-category {
      margin-bottom: 16px;
    }
    
    .skill-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
    }
    
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-left: 24px;
    }
    
    .skill-tag {
      font-size: 0.75rem;
      background: #ede9fe;
      color: #6d28d9;
      padding: 4px 8px;
      border-radius: 9999px;
      font-weight: 500;
    }
    
    .education-item, .cert-item {
      margin-bottom: 16px;
    }
    
    .education-title {
      font-weight: bold;
      font-size: 0.875rem;
      color: #1f2937;
      margin-bottom: 4px;
    }
    
    .education-subtitle {
      font-size: 0.875rem;
      color: #9333ea;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .education-detail {
      font-size: 0.75rem;
      color: #4b5563;
      margin-top: 4px;
    }
    
    .experience-item {
      margin-bottom: 24px;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 8px;
    }
    
    .experience-title {
      font-weight: bold;
      font-size: 1rem;
      color: #1f2937;
    }
    
    .experience-company {
      font-size: 0.875rem;
      color: #9333ea;
      font-weight: 500;
    }
    
    .experience-date {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
      white-space: nowrap;
    }
    
    .experience-list {
      list-style-position: inside;
      margin-left: 8px;
    }
    
    .experience-list li {
      font-size: 0.875rem;
      color: #374151;
      margin-bottom: 4px;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    
    .project-card {
      background: linear-gradient(to bottom right, #faf5ff, #eff6ff);
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e9d5ff;
    }
    
    .project-title {
      font-weight: bold;
      font-size: 0.875rem;
      color: #1f2937;
      margin-bottom: 8px;
    }
    
    .project-desc {
      font-size: 0.75rem;
      color: #4b5563;
      margin-bottom: 12px;
      line-height: 1.6;
    }
    
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    
    .project-tag {
      font-size: 0.75rem;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
    }
    
    .strengths-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    
    .strength-item {
      display: flex;
      gap: 12px;
    }
    
    .strength-dot {
      width: 8px;
      height: 8px;
      background: #ccff00;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }
    
    .strength-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #1f2937;
      margin-bottom: 2px;
    }
    
    .strength-desc {
      font-size: 0.75rem;
      color: #4b5563;
    }
    
    .footer {
      background: #f3f4f6;
      padding: 16px 40px;
      text-align: center;
    }
    
    .footer p {
      font-size: 0.75rem;
      color: #4b5563;
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Ian Kallel N. <span class="highlight">Ocumen</span></h1>
      <p class="subtitle">BS Information Technology Student | Multi-Disciplinary Creator</p>
      
      <div class="contact-grid">
        <div class="contact-item">
          <span class="icon">📧</span>
          <a href="mailto:kallel.ocu@gmail.com">kallel.ocu@gmail.com</a>
        </div>
        <div class="contact-item">
          <span class="icon">💼</span>
          <a href="https://linkedin.com/in/ianocumen">/ianocumen</a>
        </div>
        <div class="contact-item">
          <span class="icon">💻</span>
          <a href="https://github.com/IanKallelOcumen">@IanKallelOcumen</a>
        </div>
        <div class="contact-item">
          <span class="icon">📍</span>
          <span>Brgy. Timbao, Binan Laguna</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left Column -->
      <div>
        <!-- Profile -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>PROFILE</h2>
          </div>
          <p class="profile-text">
            Creative BS IT senior student with <strong>4 years of digital art experience</strong> and a passion for modern web development. 
            Skilled in building interactive React applications, Arduino projects, and providing IT support. 
            Currently building a diverse portfolio through personal projects while exploring freelance opportunities.
          </p>
        </div>

        <!-- Skills -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>SKILLS</h2>
          </div>
          
          <div class="skill-category">
            <div class="skill-title">💻 Web Development</div>
            <div class="skill-tags">
              <span class="skill-tag">React.js</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Tailwind CSS</span>
              <span class="skill-tag">HTML/CSS</span>
              <span class="skill-tag">Responsive Design</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="skill-title">🎨 Digital Art</div>
            <div class="skill-tags">
              <span class="skill-tag">Digital Illustration</span>
              <span class="skill-tag">UI/UX Design</span>
              <span class="skill-tag">Visual Design</span>
              <span class="skill-tag">Creative Direction</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="skill-title">⚙️ Hardware & IoT</div>
            <div class="skill-tags">
              <span class="skill-tag">Arduino</span>
              <span class="skill-tag">PC Building</span>
              <span class="skill-tag">Hardware Assembly</span>
              <span class="skill-tag">Basic Electronics</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="skill-title">🔧 IT Support</div>
            <div class="skill-tags">
              <span class="skill-tag">Technical Support</span>
              <span class="skill-tag">Troubleshooting</span>
              <span class="skill-tag">System Maintenance</span>
              <span class="skill-tag">User Training</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="skill-title">🛠️ Tools & Platforms</div>
            <div class="skill-tags">
              <span class="skill-tag">Git/GitHub</span>
              <span class="skill-tag">VS Code</span>
              <span class="skill-tag">Figma</span>
              <span class="skill-tag">Chrome DevTools</span>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>EDUCATION</h2>
          </div>
          
          <div class="education-item">
            <div class="education-title">Bachelor of Science in Information Technology</div>
            <div class="education-subtitle">Currently Attending - Senior Year</div>
            <div class="education-detail">Specializing in web development, software engineering, and creative computing</div>
          </div>

          <div class="education-item">
            <div class="education-title">ICT Strand - Senior High School</div>
            <div class="education-subtitle">University Of Perpetual Help System Laguna</div>
            <div class="education-detail">Graduated 2019</div>
            <div class="education-detail">Foundation in UI design, digital animation, and technical creativity</div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>CERTIFICATIONS</h2>
          </div>
          
          <div class="cert-item">
            <div class="education-title">Unity Certified User: Artist</div>
            <div class="education-detail">Passed December 2024</div>
          </div>
          <div class="cert-item">
            <div class="education-title">IC3 Living Online - Global Standard 5</div>
            <div class="education-detail">Passed December 2023</div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div>
        <!-- Experience -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>EXPERIENCE</h2>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">Freelance Web Developer & Technical Support</div>
                <div class="experience-company">Self-Employed</div>
              </div>
              <div class="experience-date">2024 - Present</div>
            </div>
            <ul class="experience-list">
              <li>Providing technical support and IT troubleshooting services to clients</li>
              <li>Building custom web applications using React, TypeScript, and modern frameworks</li>
              <li>Developing responsive, user-friendly interfaces with Tailwind CSS</li>
              <li>Currently building portfolio with 6 full-featured personal projects to demonstrate capabilities</li>
              <li>Specializing in creating interactive, visually engaging web experiences</li>
            </ul>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">IT Support & Hardware Specialist</div>
                <div class="experience-company">Various Projects</div>
              </div>
              <div class="experience-date">2022 - Present</div>
            </div>
            <ul class="experience-list">
              <li>PC building, assembly, and hardware diagnostics for custom systems</li>
              <li>Troubleshooting software and hardware issues with systematic approach</li>
              <li>Arduino projects including basic to moderate IoT implementations</li>
              <li>Maintaining and optimizing computer systems for performance</li>
            </ul>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">Digital Artist</div>
                <div class="experience-company">Personal & Commission Work</div>
              </div>
              <div class="experience-date">2020 - Present</div>
            </div>
            <ul class="experience-list">
              <li>4+ years of digital illustration and creative design experience</li>
              <li>Creating original artwork, character designs, and visual concepts</li>
              <li>Applying design principles to UI/UX work in web development projects</li>
              <li>Combining artistic sensibility with technical implementation skills</li>
            </ul>
          </div>
        </div>

        <!-- Featured Projects -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>FEATURED PROJECTS</h2>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <div class="project-title">TaskFlow Pro - Todo Management</div>
              <div class="project-desc">
                Advanced task manager with dark mode, priority systems, category filtering, analytics dashboard, and local storage persistence.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #9333ea;">React</span>
                <span class="project-tag" style="background: #9333ea;">TypeScript</span>
                <span class="project-tag" style="background: #9333ea;">Motion</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-title">Weather Intelligence Dashboard</div>
              <div class="project-desc">
                Real-time weather app with 7-day forecasts, severe weather alerts, location saving, and beautiful data visualizations using Recharts.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #2563eb;">React</span>
                <span class="project-tag" style="background: #2563eb;">Recharts</span>
                <span class="project-tag" style="background: #2563eb;">API Integration</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-title">TechShop - E-Commerce Platform</div>
              <div class="project-desc">
                Full-featured online store with shopping cart, advanced filtering, wishlist, product reviews, checkout flow, and order management.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #16a34a;">React</span>
                <span class="project-tag" style="background: #16a34a;">State Management</span>
                <span class="project-tag" style="background: #16a34a;">UX Design</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-title">CulinaryHub - Recipe Discovery</div>
              <div class="project-desc">
                Interactive recipe platform with difficulty ratings, cooking time filters, ingredient search, favorites, and meal planning features.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #ea580c;">React</span>
                <span class="project-tag" style="background: #ea580c;">Filtering</span>
                <span class="project-tag" style="background: #ea580c;">Animations</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-title">ProjectFlow - Kanban Board</div>
              <div class="project-desc">
                Drag-and-drop project management tool with task tracking, team collaboration, progress analytics, and customizable workflows.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #6366f1;">React DnD</span>
                <span class="project-tag" style="background: #6366f1;">Complex State</span>
                <span class="project-tag" style="background: #6366f1;">Analytics</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-title">Personal Portfolio Website</div>
              <div class="project-desc">
                Futuristic portfolio showcasing multi-disciplinary skills with interactive elements, smooth animations, and responsive design.
              </div>
              <div class="project-tags">
                <span class="project-tag" style="background: #9333ea;">React</span>
                <span class="project-tag" style="background: #9333ea;">Motion</span>
                <span class="project-tag" style="background: #9333ea;">Tailwind</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 16px; text-align: center;">
            <p style="font-size: 0.875rem; color: #4b5563;">
              <strong>All projects available on GitHub:</strong> <span style="color: #9333ea; font-weight: 500;">github.com/IanKallelOcumen</span>
            </p>
          </div>
        </div>

        <!-- Key Strengths -->
        <div class="section">
          <div class="section-header">
            <div class="bar"></div>
            <h2>KEY STRENGTHS</h2>
          </div>
          
          <div class="strengths-grid">
            <div class="strength-item">
              <div class="strength-dot"></div>
              <div>
                <div class="strength-title">Multi-Disciplinary Mindset</div>
                <div class="strength-desc">Blend creative design with technical implementation</div>
              </div>
            </div>
            <div class="strength-item">
              <div class="strength-dot"></div>
              <div>
                <div class="strength-title">Fast Learner</div>
                <div class="strength-desc">Quickly adapts to new technologies and frameworks</div>
              </div>
            </div>
            <div class="strength-item">
              <div class="strength-dot"></div>
              <div>
                <div class="strength-title">Problem Solver</div>
                <div class="strength-desc">Systematic approach to debugging and troubleshooting</div>
              </div>
            </div>
            <div class="strength-item">
              <div class="strength-dot"></div>
              <div>
                <div class="strength-title">Detail-Oriented</div>
                <div class="strength-desc">Ensures quality in both code and visual design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>Portfolio & Projects:</strong> Available for preview at 
        <span style="color: #9333ea; font-weight: 500;">github.com/IanKallelOcumen</span> • 
        Open to freelance opportunities and collaborative projects
      </p>
    </div>
  </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ian_Ocumen_Resume.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white p-8 print:p-0">
      {/* A4 Size Container - Ready for PDF Export */}
      <div
        className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none"
        style={{ minHeight: "297mm" }}
      >
        {/* Header Section - Modern Gradient */}
        <div className="bg-gradient-to-r from-[#1a1a2e] via-[#2a1a4a] to-[#1a1a2e] text-white p-10 print:p-8">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h1
                className="text-5xl font-bold mb-2 tracking-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ian Kallel N.{" "}
                <span className="text-[#ccff00]">Ocumen</span>
              </h1>
              <p className="text-xl text-purple-200 mb-6 font-medium">
                BS Information Technology Student |
                Multi-Disciplinary Creator
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#ccff00]" />
                  <a
                    href="mailto:kallel.ocu@gmail.com"
                    className="hover:text-[#ccff00] transition-colors"
                  >
                    kallel.ocu@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#ccff00]" />
                  <a
                    href="https://linkedin.com/in/ianocumen"
                    className="hover:text-[#ccff00] transition-colors"
                  >
                    /ianocumen
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-[#ccff00]" />
                  <a
                    href="https://github.com/IanKallelOcumen"
                    className="hover:text-[#ccff00] transition-colors"
                  >
                    @IanKallelOcumen
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ccff00]" />
                  <span>Brgy. Timbao, Binan Laguna</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-3 gap-8 p-10 print:p-8">
          {/* Left Column - Skills & Education */}
          <div className="space-y-8">
            {/* Professional Summary */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  PROFILE
                </h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Creative BS IT senior student with{" "}
                <strong>
                  4 years of digital art experience
                </strong>{" "}
                and a passion for modern web development.
                Skilled in building interactive React
                applications, Arduino projects, and providing IT
                support. Currently building a diverse portfolio
                through personal projects while exploring
                freelance opportunities.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  SKILLS
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm text-gray-800">
                      Web Development
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-6">
                    {[
                      "React.js",
                      "TypeScript",
                      "JavaScript",
                      "Tailwind CSS",
                      "HTML/CSS",
                      "Responsive Design",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm text-gray-800">
                      Digital Art
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-6">
                    {[
                      "Digital Illustration",
                      "UI/UX Design",
                      "Visual Design",
                      "Creative Direction",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm text-gray-800">
                      Hardware & IoT
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-6">
                    {[
                      "Arduino",
                      "PC Building",
                      "Hardware Assembly",
                      "Basic Electronics",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm text-gray-800">
                      IT Support
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-6">
                    {[
                      "Technical Support",
                      "Troubleshooting",
                      "System Maintenance",
                      "User Training",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm text-gray-800">
                      Tools & Platforms
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-6">
                    {[
                      "Git/GitHub",
                      "VS Code",
                      "Figma",
                      "Chrome DevTools",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  EDUCATION
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">
                        Bachelor of Science in Information
                        Technology
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        Currently Attending - Senior Year
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Specializing in web development,
                        software engineering, and creative
                        computing
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">
                        ICT Strand - Senior High School
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        University Of Perpetual Help System Laguna
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Graduated 2019
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Foundation in UI design, digital
                        animation, and technical creativity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  CERTIFICATIONS
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#ccff00] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Unity Certified User: Artist
                    </h3>
                    <p className="text-xs text-gray-600">
                      Passed December 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#ccff00] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      IC3 Living Online - Global Standard 5
                    </h3>
                    <p className="text-xs text-gray-600">
                      Passed December 2023
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Experience & Projects */}
          <div className="col-span-2 space-y-8">
            {/* Professional Experience */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  EXPERIENCE
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-base text-gray-800">
                        Freelance Web Developer & Technical
                        Support
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        Self-Employed
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      2024 - Present
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                    <li>
                      Providing technical support and IT
                      troubleshooting services to clients
                    </li>
                    <li>
                      Building custom web applications using
                      React, TypeScript, and modern frameworks
                    </li>
                    <li>
                      Developing responsive, user-friendly
                      interfaces with Tailwind CSS
                    </li>
                    <li>
                      Currently building portfolio with 6
                      full-featured personal projects to
                      demonstrate capabilities
                    </li>
                    <li>
                      Specializing in creating interactive,
                      visually engaging web experiences
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-base text-gray-800">
                        IT Support & Hardware Specialist
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        Various Projects
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      2022 - Present
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                    <li>
                      PC building, assembly, and hardware
                      diagnostics for custom systems
                    </li>
                    <li>
                      Troubleshooting software and hardware
                      issues with systematic approach
                    </li>
                    <li>
                      Arduino projects including basic to
                      moderate IoT implementations
                    </li>
                    <li>
                      Maintaining and optimizing computer
                      systems for performance
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-base text-gray-800">
                        Digital Artist
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        Personal & Commission Work
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      2020 - Present
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                    <li>
                      4+ years of digital illustration and
                      creative design experience
                    </li>
                    <li>
                      Creating original artwork, character
                      designs, and visual concepts
                    </li>
                    <li>
                      Applying design principles to UI/UX work
                      in web development projects
                    </li>
                    <li>
                      Combining artistic sensibility with
                      technical implementation skills
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  FEATURED PROJECTS
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    TaskFlow Pro - Todo Management
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Advanced task manager with dark mode,
                    priority systems, category filtering,
                    analytics dashboard, and local storage
                    persistence.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      React
                    </span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      TypeScript
                    </span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      Motion
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    Weather Intelligence Dashboard
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Real-time weather app with 7-day forecasts,
                    severe weather alerts, location saving, and
                    beautiful data visualizations using
                    Recharts.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      React
                    </span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      Recharts
                    </span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      API Integration
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    TechShop - E-Commerce Platform
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Full-featured online store with shopping
                    cart, advanced filtering, wishlist, product
                    reviews, checkout flow, and order
                    management.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      React
                    </span>
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      State Management
                    </span>
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      UX Design
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    CulinaryHub - Recipe Discovery
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Interactive recipe platform with difficulty
                    ratings, cooking time filters, ingredient
                    search, favorites, and meal planning
                    features.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded">
                      React
                    </span>
                    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded">
                      Filtering
                    </span>
                    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded">
                      Animations
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    ProjectFlow - Kanban Board
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Drag-and-drop project management tool with
                    task tracking, team collaboration, progress
                    analytics, and customizable workflows.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">
                      React DnD
                    </span>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">
                      Complex State
                    </span>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">
                      Analytics
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">
                    Personal Portfolio Website
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Futuristic portfolio showcasing
                    multi-disciplinary skills with interactive
                    elements, smooth animations, and responsive
                    design.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      React
                    </span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      Motion
                    </span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      Tailwind
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  <strong>
                    All projects available on GitHub:
                  </strong>{" "}
                  <span className="text-purple-600 font-medium">
                    github.com/IanKallelOcumen
                  </span>
                </p>
              </div>
            </section>

            {/* Key Strengths */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-purple-600">
                <div className="w-1 h-6 bg-[#ccff00]" />
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  KEY STRENGTHS
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Multi-Disciplinary Mindset
                    </h3>
                    <p className="text-xs text-gray-600">
                      Blend creative design with technical
                      implementation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Fast Learner
                    </h3>
                    <p className="text-xs text-gray-600">
                      Quickly adapts to new technologies and
                      frameworks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Problem Solver
                    </h3>
                    <p className="text-xs text-gray-600">
                      Systematic approach to debugging and
                      troubleshooting
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Detail-Oriented
                    </h3>
                    <p className="text-xs text-gray-600">
                      Ensures quality in both code and visual
                      design
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-10 py-4 print:px-8 print:py-3 text-center">
          <p className="text-xs text-gray-600">
            <strong>Portfolio & Projects:</strong> Available for
            preview at{" "}
            <span className="text-purple-600 font-medium">
              github.com/IanKallelOcumen
            </span>{" "}
            • Open to freelance opportunities and collaborative
            projects
          </p>
        </div>
      </div>
    </div>
  );
}
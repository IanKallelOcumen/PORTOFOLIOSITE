import { ArrowRight, Github, Linkedin, Mail, Code, Briefcase, GraduationCap, Award, MapPin, Phone, ExternalLink, FileText } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import { Card } from './Card';
import { Tag } from './Tag';
import { GitHubProjects } from './GitHubProjects';
import { motion } from 'motion/react';

interface HomeViewProps {
  onProjectClick: (view: 'landing' | 'todo' | 'weather' | 'recipe' | 'ecommerce' | 'project-board' | 'resume') => void;
  mousePosition: { x: number; y: number };
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

export const HomeView = memo(function HomeView({ onProjectClick, mousePosition }: HomeViewProps) {
  const handleProjectClick = useCallback((id: any) => {
    onProjectClick(id);
  }, [onProjectClick]);

  const featuredProjects = [
    {
      title: 'StressBuster',
      description: 'Mobile app designed to help users cope with stress through guided exercises and tracking.',
      tags: ['JavaScript', 'Mobile App', 'Wellness'],
      color: '#9333ea'
    },
    {
      title: 'Lakbay Tala',
      description: '2D side-scroller mobile game based on mythology and history in Laguna.',
      tags: ['C#', '2D Game', 'Mobile'],
      color: '#2563eb'
    },
    {
      title: 'SHL Game Center',
      description: 'Web app for Swedish Hockey League with live scores, player statistics, and match analytics.',
      tags: ['TypeScript', 'Sports', 'Analytics'],
      color: '#16a34a'
    },
    {
      title: 'Personal Portfolio',
      description: 'Portfolio website showcasing resume, projects, and GitHub work with responsive design.',
      tags: ['TypeScript', 'React', 'Portfolio'],
      color: '#ea580c'
    }
  ];

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card className="relative overflow-visible" mousePosition={mousePosition}>
          <div className="flex items-center gap-2.5 mb-6">
            <Tag className="bg-[rgba(204,255,0,0.1)] text-[#ccff00] border-[#ccff00]">
              <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
              AVAILABLE FOR WORK
            </Tag>
          </div>
          
          <h1 className="text-[clamp(2.5rem,8vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] mb-4">
            Ian Kallel Ocumen
          </h1>
          <h2 className="text-[clamp(1.25rem,4vw,2rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-[#ccff00] mb-6">
            Full-Stack Developer | Mobile Engineer | IT Specialist
          </h2>
          
          <p className="text-[#999] text-[15px] md:text-[17px] max-w-[800px] leading-[1.8] font-light tracking-[-0.01em]">
            BSIT Game Development Graduate with over 5 years of concurrent, hands-on experience engineering cross-platform mobile applications, full-stack web architectures, and interactive Unity 2D systems.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href="mailto:kallel.ocu@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#ccff00] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="t ext-sm">kallel.ocu@gmail.com</span>
            </a>
            <a href="tel:09760097680" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#ccff00] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">09760097680</span>
            </a>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Binan, Laguna</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Professional Summary */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card mousePosition={mousePosition}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-[#ccff00]" />
            Professional Summary
          </h2>
          <p className="text-[#888] text-base leading-relaxed">
            Highly specialized BSIT Game Development Graduate from the University of Perpetual Help System-Laguna (Graduated June 12, 2026) with over 5 years of concurrent, hands-on experience engineering cross-platform mobile applications, full-stack web architectures, and interactive Unity 2D systems. Fuses an advanced, modern development ecosystem (React Native, React, Node.js, TypeScript, Tailwind CSS) with foundational enterprise IT infrastructure experience. Proven expertise utilizing Git/GitHub version control, Vite build optimization, and custom Windows environments to deploy production-ready applications.
          </p>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Professional Experience</h2>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[#ccff00]/30">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]" />
              <div className="text-xs text-[#ccff00] mb-1">JAN 2021 - PRESENT</div>
              <h3 className="text-base md:text-lg font-bold mb-1">Cross-Platform Mobile, Full-Stack & Unity Developer</h3>
              <p className="text-sm text-[#888] mb-2">Independent Software Developer & IT Contractor | Remote / Freelance</p>
              <ul className="text-sm text-[#666] space-y-1 list-disc list-inside">
                <li>Architect and deploy responsive cross-platform mobile apps using React Native, Expo, and TypeScript</li>
                <li>Design high-performance web interfaces using React with Tailwind CSS for modular, mobile-first styling</li>
                <li>Configure ultra-fast dev servers using Vite, optimizing HMR and compilation pipelines</li>
                <li>Engineer modular 2D interactive logic within Unity using component-driven C# scripting</li>
                <li>Construct scalable backend microservices and API layers using Node.js and Express.js</li>
              </ul>
            </div>
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-white/30 rounded-full" />
              <div className="text-xs text-[#888] mb-1">JAN 2026 - APR 2026</div>
              <h3 className="text-base md:text-lg font-bold mb-1">Account Operations Specialist & Systems Intermediary</h3>
              <p className="text-sm text-[#888] mb-2">Virtual Champs Global (VCG) / 1 Call Closers | Remote / Offshore</p>
              <ul className="text-sm text-[#666] space-y-1 list-disc list-inside">
                <li>Drove premium gym subscription upsells by managing real-time CRM pipelines</li>
                <li>Handled international client communications across complex account structures</li>
                <li>Partnered with remote Western operations teams to refine outreach scripts</li>
              </ul>
            </div>
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-white/30 rounded-full" />
              <div className="text-xs text-[#888] mb-1">FEB 2025 - MAY 2025</div>
              <h3 className="text-base md:text-lg font-bold mb-1">IT Support & Hardware Specialist</h3>
              <p className="text-sm text-[#888] mb-2">Shin-Etsu Chemical Co. (OJT Internship) | On-Site</p>
              <ul className="text-sm text-[#666] space-y-1 list-disc list-inside">
                <li>Diagnosed and resolved hardware/software issues across enterprise workstations</li>
                <li>Conducted system audits, asset inventory management, and preventive maintenance</li>
                <li>Provided direct end-user technical support and documentation</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Education & Certifications */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Education & Certifications</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-bold mb-1">Bachelor of Science in Information Technology</h3>
              <p className="text-sm text-[#ccff00] mb-2">Specialization in Game Development</p>
              <p className="text-sm text-[#888]">University of Perpetual Help System-Laguna | Graduated June 12, 2026</p>
              <p className="text-xs text-[#666] mt-2">Core: Cross-platform React Native projects, full-stack React/Node.js web models, interactive C#/Unity 2D builds</p>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#ccff00]" />
                <h3 className="text-lg font-bold">Certifications</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-bold text-sm mb-1">Unity Certified User: Artist</h4>
                  <p className="text-xs text-[#888]">Unity Technologies | December 2024</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-bold text-sm mb-1">IC3 Living Online GS5</h4>
                  <p className="text-xs text-[#888]">Certiport | December 2023</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-bold text-sm mb-1">TOEIC - Score 840 (B2/C1 Level English)</h4>
                  <p className="text-xs text-[#888]">ETS | Passed November 22, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Technical Skills */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sm mb-3 text-[#ccff00]">Mobile & Game Engineering</h3>
              <div className="flex flex-wrap gap-2">
                {['React Native', 'Expo', 'Unity Engine', 'Unity 2D', 'C# Scripting', 'Mobile Hardware Integration'].map(skill => (
                  <span key={skill} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-[#ccff00]">Web Development & Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'RESTful APIs'].map(skill => (
                  <span key={skill} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-[#ccff00]">Developer Environment & Tooling</h3>
              <div className="flex flex-wrap gap-2">
                {['VS Code', 'Vite', 'Git/GitHub', 'Windows Terminal/Bash', 'npm/yarn', 'Postman'].map(skill => (
                  <span key={skill} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-[#ccff00]">IT Infrastructure & Systems</h3>
              <div className="flex flex-wrap gap-2">
                {['PC Architecture', 'Hardware/Software Diagnostics', 'System Deployment', 'Asset Auditing'].map(skill => (
                  <span key={skill} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Featured Projects */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card mousePosition={mousePosition}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-[#ccff00]" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredProjects.map((project, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#ccff00]/50 transition-all">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-[#888] mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* GitHub Projects */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card mousePosition={mousePosition}>
          <GitHubProjects
            username="IanKallelOcumen"
            excludeRepos={['PORTOFOLIOSITE']}
            mousePosition={mousePosition}
          />
        </Card>
      </motion.div>

      {/* Contact Section */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4 mt-8">
        <Card mousePosition={mousePosition}>
          <div className="text-center py-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-[#888] text-base md:text-lg mb-8 max-w-[600px] mx-auto">
              Available for freelance projects, full-time opportunities, and collaborations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:kallel.ocu@gmail.com"
                className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-[#050505] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </a>
              <button
                onClick={() => onProjectClick('resume')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:border-[#ccff00] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Download Resume PDF
              </button>
              <a
                href="https://github.com/IanKallelOcumen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:border-[#ccff00] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ianocumen/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.main>
  );
});

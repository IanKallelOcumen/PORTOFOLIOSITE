import { ArrowRight, Github, Linkedin, Mail, Code, Palette, Cpu, Wrench, Lightbulb, Target, Zap, Users, Star, ExternalLink, FileText, Trophy, Briefcase, GraduationCap, Sparkles, ChevronLeft, ChevronRight, MapPin, Award } from 'lucide-react';
import { useState } from 'react';
import { Card } from './Card';
import { Tag } from './Tag';
import { SkillMeter } from './SkillMeter';
import { StatCounter } from './StatCounter';
import { motion } from 'motion/react';
import unityCert from 'figma:asset/315b4809c5d2ebc254692234a61757098859cbb8.png';
import ic3Cert from 'figma:asset/d5c6336fce49d34f930118a1078688c4ff96dd69.png';

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

export function HomeView({ onProjectClick, mousePosition }: HomeViewProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 'landing' as const,
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      tag: 'LANDING PAGE',
      title: 'Personal Portfolio',
      description: 'Clean, professional landing page with contact form.',
      difficulty: 'Easy'
    },
    {
      id: 'todo' as const,
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
      tag: 'TODO APP',
      title: 'TaskFlow Manager',
      description: 'Full-featured task manager with localStorage persistence.',
      difficulty: 'Easy'
    },
    {
      id: 'weather' as const,
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      tag: 'WEATHER APP',
      title: 'WeatherNow Dashboard',
      description: 'Real-time weather data with 5-day forecast.',
      difficulty: 'Medium'
    },
    {
      id: 'recipe' as const,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',
      tag: 'RECIPE APP',
      title: 'RecipeHub Finder',
      description: 'Search and browse recipes with detailed instructions.',
      difficulty: 'Medium'
    },
    {
      id: 'ecommerce' as const,
      image: 'https://images.unsplash.com/photo-1763872038252-e6c4e0a11067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY4NTk1NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tag: 'ECOMMERCE',
      title: 'TechShop Store',
      description: 'Full e-commerce with cart, checkout, and payments.',
      difficulty: 'Hard'
    },
    {
      id: 'project-board' as const,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      tag: 'PROJECT BOARD',
      title: 'Kanban Dashboard',
      description: 'Advanced project management with drag-and-drop.',
      difficulty: 'Hard'
    }
  ];

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-4 perspective-[1000px]"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
        <Card className="relative overflow-visible" mousePosition={mousePosition}>
          <div className="flex items-center gap-2.5 mb-4 md:mb-6">
            <Tag className="bg-[rgba(204,255,0,0.1)] text-[#ccff00] border-[#ccff00]">
              <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
              AVAILABLE
            </Tag>
            <Tag>V 2.0.5</Tag>
          </div>
          
          <h1 className="text-[clamp(2rem,8vw,4.5rem)] leading-[0.9] font-bold tracking-[-0.04em] mb-3 md:mb-4">
            <span className="relative bg-gradient-to-r from-white via-[#ccff00] to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
              DEVELOPER • ARTIST • EDITOR
            </span>
          </h1>
          <h1 className="text-[clamp(2rem,8vw,4.5rem)] leading-[0.9] font-bold tracking-[-0.04em] text-[#444]">
            TECH SUPPORT
          </h1>
          
          <p className="text-[#999] text-[15px] md:text-[17px] mt-6 md:mt-8 max-w-[550px] leading-[1.8] font-light tracking-[-0.01em]">
            Designing <span className="text-white font-medium border-b border-[#ccff00]">interactive experiences</span> through code, art, and video. 4 years drawing + building tech solutions + creating short-form content.
          </p>

          {/* Decorative Corner */}
          <div 
            className="absolute top-5 right-5 w-[60px] h-[60px] md:w-[100px] md:h-[100px] border border-white/10 hidden sm:block"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
            }}
          />
        </Card>
      </motion.div>

      {/* About */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2" id="about">
        <Card mousePosition={mousePosition}>
          <h2 className="text-xl md:text-2xl font-bold mb-2">01. The Profile</h2>
          <p className="text-[#888] text-sm md:text-base leading-relaxed">
            Multi-disciplinary creator combining visual design with technical execution. From sketching UI concepts to building custom PCs - I bring ideas to life across digital and physical realms.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 md:mt-8">
            <Tag><MapPin className="w-3.5 h-3.5" /> Biñan, PH</Tag>
            <Tag><Code className="w-3.5 h-3.5" /> Dev + Design + Support</Tag>
          </div>

          {/* What I Do - Quick Overview */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#ccff00] mb-4">WHAT I DO</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5" />
                <div>
                  <div className="text-sm font-bold">Web Development</div>
                  <div className="text-xs text-[#666]">React • Tailwind</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5" />
                <div>
                  <div className="text-sm font-bold">Digital Art</div>
                  <div className="text-xs text-[#666]">4 years experience</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5" />
                <div>
                  <div className="text-sm font-bold">Tech Support</div>
                  <div className="text-xs text-[#666]">PC building • IT</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5" />
                <div>
                  <div className="text-sm font-bold">Video Editing</div>
                  <div className="text-xs text-[#666]">CapCut • Content</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Skills */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Tech Stack</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            <SkillMeter skill="UI/UX Design" level={85} delay={0.2} />
            <SkillMeter skill="Digital Art" level={88} delay={0.3} />
            <SkillMeter skill="React" level={75} delay={0.4} />
            <SkillMeter skill="IT Support" level={90} delay={0.5} />
            <SkillMeter skill="Arduino" level={68} delay={0.6} />
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Stats</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div>
              <div className="text-[#888] text-sm mb-2">Projects Completed</div>
              <StatCounter target={6} suffix="" delay={0.3} />
            </div>
            <div>
              <div className="text-[#888] text-sm mb-2">Drawing Experience</div>
              <StatCounter target={4} suffix=" Years" delay={0.4} />
            </div>
            <div>
              <div className="text-[#888] text-sm mb-2">Uptime Rate</div>
              <StatCounter target={100} suffix="%" delay={0.5} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Experience</h2>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[#ccff00]/30">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]" />
              <div className="text-xs text-[#ccff00] mb-1">PRESENT</div>
              <h3 className="text-base md:text-lg font-bold mb-1">Freelance Work</h3>
              <p className="text-sm text-[#888]">Multi-disciplinary freelancing - tech support, web dev & digital art</p>
            </div>
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-white/30 rounded-full" />
              <div className="text-xs text-[#888] mb-1">2023 - PRESENT</div>
              <h3 className="text-base md:text-lg font-bold mb-1">Freelance Tech Support</h3>
              <p className="text-sm text-[#888]">Remote troubleshooting & PC building</p>
            </div>
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-white/30 rounded-full" />
              <div className="text-xs text-[#888] mb-1">2020 - PRESENT</div>
              <h3 className="text-base md:text-lg font-bold mb-1">Digital Artist</h3>
              <p className="text-sm text-[#888]">4 years of illustration & design work</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Education</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold">BS Information Technology</h3>
                  <p className="text-sm text-[#888]">Senior Student</p>
                </div>
                <Tag className="text-xs">IN PROGRESS</Tag>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Focusing on web development, systems design, and technical problem-solving. Building practical skills through personal projects and hands-on learning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-[#ccff00]">6</div>
                <div className="text-xs text-[#888]">Personal Projects</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-[#ccff00]">3+</div>
                <div className="text-xs text-[#888]">Technologies</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Certifications */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Certifications</h2>
          </div>
          <div className="space-y-4">
            {/* Unity Certification */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#ccff00]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold">Unity Certified User - Artist</h3>
                  <p className="text-sm text-[#888]">Unity Technologies</p>
                </div>
                <Tag className="text-xs">DECEMBER 2024</Tag>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Certified in Unity 3D artist tools, demonstrating proficiency in game asset creation and interactive design.
              </p>
            </div>

            {/* IC3 Digital Literacy */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#ccff00]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold">IC3 Living Online - Global Standard 5</h3>
                  <p className="text-sm text-[#888]">Certiport</p>
                </div>
                <Tag className="text-xs">DECEMBER 2023</Tag>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Certified in digital literacy fundamentals including online safety, digital communication, and cloud technologies.
              </p>
            </div>

            {/* Certification Count */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#ccff00]">2</div>
              <div className="text-xs text-[#888]">Professional Certifications</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* System Status - Visual Flair */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">System Status</h2>
          </div>
          
          {/* Terminal-style display */}
          <div className="bg-black/40 rounded-lg p-4 font-mono text-xs md:text-sm border border-[#ccff00]/20 mb-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff0040]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ccff00]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
              </div>
              <span className="text-[#888]">portfolio_v2.0.5/status</span>
            </div>
            <div className="space-y-2 text-[#00ff88]">
              <div className="flex items-center gap-2">
                <span className="text-[#ccff00]">$</span>
                <span className="text-white/60">system.check()</span>
              </div>
              <div className="pl-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[#00ff88]">✓ SKILLS_MODULE: OPERATIONAL</div>
                  <div className="text-[#00ff88]">✓ PROJECT_ENGINE: READY</div>
                  <div className="text-[#00ff88]">✓ CREATIVITY_CORE: ACTIVE</div>
                  <div className="text-[#ccff00]">⚡ AVAILABILITY: ONLINE</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Real-time metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#ccff00]/10 to-transparent rounded-lg p-3 border border-[#ccff00]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                <div className="text-xs text-[#888]">System Uptime</div>
              </div>
              <div className="text-2xl font-bold text-[#ccff00]">99.9%</div>
            </div>
            <div className="bg-gradient-to-br from-[#00ff88]/10 to-transparent rounded-lg p-3 border border-[#00ff88]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                <div className="text-xs text-[#888]">Active Projects</div>
              </div>
              <div className="text-2xl font-bold text-[#00ff88]">6</div>
            </div>
            <div className="bg-gradient-to-br from-[#ff0040]/10 to-transparent rounded-lg p-3 border border-[#ff0040]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#ff0040] rounded-full animate-pulse"></div>
                <div className="text-xs text-[#888]">Code Quality</div>
              </div>
              <div className="text-2xl font-bold text-[#ff0040]">A+</div>
            </div>
            <div className="bg-gradient-to-br from-[#0080ff]/10 to-transparent rounded-lg p-3 border border-[#0080ff]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#0080ff] rounded-full animate-pulse"></div>
                <div className="text-xs text-[#888]">Response Time</div>
              </div>
              <div className="text-2xl font-bold text-[#0080ff]">&lt;24h</div>
            </div>
          </div>

          {/* Version info */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#666]">
            <span>BUILD: 2026.01.17</span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse"></div>
              LIVE
            </span>
          </div>
        </Card>
      </motion.div>

      {/* SELECTED WORKS Section - Moved Here for Prominence */}
      <motion.div 
        variants={itemVariants}
        className="col-span-1 md:col-span-4"
        id="work"
      >
        <Card mousePosition={mousePosition}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#ccff00] rounded bg-[#ccff00]/10 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                <div className="w-5 h-5 bg-[#ccff00] animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 60%, 40% 60%, 40% 40%, 0 40%)' }} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">SELECTED WORKS</h2>
                <p className="text-xs text-[#888]">Click to explore live demos</p>
              </div>
            </div>

            {/* Navigation Buttons - Desktop Only (Top) */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                onClick={() => setActiveProject(activeProject === 0 ? projects.length - 1 : activeProject - 1)}
                className="group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 hover:bg-[#ccff00] border border-white/10 hover:border-[#ccff00] rounded-lg transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(204,255,0,0.5)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Animated background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#ccff00]/0 via-[#ccff00]/20 to-[#ccff00]/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className="w-5 h-5 text-[#888] group-hover:text-[#050505] transition-colors relative z-10" />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => setActiveProject(activeProject === projects.length - 1 ? 0 : activeProject + 1)}
                className="group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 hover:bg-[#ccff00] border border-white/10 hover:border-[#ccff00] rounded-lg transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(204,255,0,0.5)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Animated background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#ccff00]/0 via-[#ccff00]/20 to-[#ccff00]/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-[#888] group-hover:text-[#050505] transition-colors relative z-10" />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Main Project Display */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative group cursor-pointer"
            onClick={() => onProjectClick(projects[activeProject].id)}
          >
            {/* Project Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <img
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Tag Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-[#ff0040] text-white text-xs font-bold px-4 py-2 uppercase shadow-lg">
                  {projects[activeProject].tag}
                </div>
              </div>

              {/* Live Demo Badge */}
              <div className="absolute top-6 right-6 bg-[#ccff00] text-[#050505] text-xs font-bold px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 bg-[#050505] rounded-full animate-pulse" />
                LIVE DEMO
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl md:text-4xl font-bold mb-3 text-white group-hover:text-[#ccff00] transition-colors">
                    {projects[activeProject].title}
                  </h3>
                  <p className="text-sm md:text-base text-[#ccc] mb-4 max-w-[600px]">
                    {projects[activeProject].description}
                  </p>
                  
                  {/* Explore Button */}
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#ccff00] text-[#050505] font-bold rounded-full group-hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300">
                    <span>EXPLORE PROJECT</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </motion.div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(204,255,0,0.03)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Project Selector Buttons */}
          <div className="grid grid-cols-6 gap-2 md:gap-3 mt-8">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProject(index);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                {/* Thumbnail */}
                <div className={`
                  relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                  ${activeProject === index 
                    ? 'border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.6)] scale-105 ring-2 ring-[#ccff00]/30' 
                    : 'border-white/30 hover:border-[#ccff00]/70 opacity-60 hover:opacity-100 hover:scale-105'
                  }
                `}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Active Overlay */}
                  {activeProject === index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#ccff00]/20 backdrop-blur-[1px]" 
                    />
                  )}
                  
                  {/* Project Number Badge */}
                  <div className={`absolute top-1 left-1 text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 rounded transition-all ${
                    activeProject === index 
                      ? 'bg-[#ccff00] text-[#050505]' 
                      : 'bg-black/60 text-white/80'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Hover Tag - Hidden on small screens */}
                  <div className="hidden md:block absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/90 backdrop-blur-sm text-white text-[8px] md:text-[10px] font-bold px-2 py-1 text-center rounded truncate">
                      {project.tag}
                    </div>
                  </div>


                </div>

                {/* Active Dot Indicator */}
                {activeProject === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ccff00] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.8)]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Project Counter - Centered Display */}
          <div className="flex items-center justify-center mt-8">
            <motion.div 
              className="text-center"
              key={activeProject}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-sm text-[#888]">
                <motion.span 
                  className="text-[#ccff00] font-bold text-xl"
                  key={`count-${activeProject}`}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeProject + 1}
                </motion.span>
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white/60">{projects.length}</span>
              </div>
              <div className="text-[10px] text-[#666] mt-1">{projects[activeProject].difficulty} Level</div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Performance Metrics Visualization */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">Performance Overview</h2>
          </div>
          
          {/* Skill Distribution Graph */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#888]">Frontend Development</span>
                <span className="text-sm font-bold text-[#ccff00]">85%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#ccff00] to-[#88ff00]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#888]">Digital Art & Design</span>
                <span className="text-sm font-bold text-[#ccff00]">88%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#ff0080] to-[#ff0040]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '88%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#888]">IT Support & Hardware</span>
                <span className="text-sm font-bold text-[#ccff00]">90%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0080ff]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '90%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#888]">Video Editing & Content</span>
                <span className="text-sm font-bold text-[#ccff00]">75%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#9d00ff] to-[#6600ff]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-[#888] mb-1">Response Time</div>
              <div className="text-2xl font-bold text-[#ccff00]">&lt;24h</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-[#888] mb-1">Client Satisfaction</div>
              <div className="text-2xl font-bold text-[#ccff00]">100%</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* My Approach */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <Card mousePosition={mousePosition}>
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl md:text-2xl font-bold">My Approach</h2>
          </div>

          <div className="space-y-4">
            {/* Approach Item 1 */}
            <div className="group">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:border-[#ccff00]/50 hover:bg-white/10">
                <div className="flex items-center justify-center w-10 h-10 bg-[#ccff00]/10 rounded-lg border border-[#ccff00]/30 group-hover:border-[#ccff00] transition-all duration-300">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">User-Centered Design</h3>
                  <p className="text-xs text-[#888] leading-relaxed">
                    Every project starts with understanding the user. Clean interfaces, intuitive flow.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach Item 2 */}
            <div className="group">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:border-[#ff0040]/50 hover:bg-white/10">
                <div className="flex items-center justify-center w-10 h-10 bg-[#ff0040]/10 rounded-lg border border-[#ff0040]/30 group-hover:border-[#ff0040] transition-all duration-300">
                  <div className="w-2 h-2 bg-[#ff0040] rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Fast & Reliable</h3>
                  <p className="text-xs text-[#888] leading-relaxed">
                    Efficient workflow meets quality output. Quick turnaround without compromise.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach Item 3 */}
            <div className="group">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:border-[#0080ff]/50 hover:bg-white/10">
                <div className="flex items-center justify-center w-10 h-10 bg-[#0080ff]/10 rounded-lg border border-[#0080ff]/30 group-hover:border-[#0080ff] transition-all duration-300">
                  <div className="w-2 h-2 bg-[#0080ff] rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Clean Code</h3>
                  <p className="text-xs text-[#888] leading-relaxed">
                    Maintainable, well-documented, following best practices for long-term success.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach Item 4 */}
            <div className="group">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:border-[#9d00ff]/50 hover:bg-white/10">
                <div className="flex items-center justify-center w-10 h-10 bg-[#9d00ff]/10 rounded-lg border border-[#9d00ff]/30 group-hover:border-[#9d00ff] transition-all duration-300">
                  <div className="w-2 h-2 bg-[#9d00ff] rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Continuous Learning</h3>
                  <p className="text-xs text-[#888] leading-relaxed">
                    Always exploring new tools and techniques to stay ahead of the curve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        variants={itemVariants} 
        className="col-span-1 md:col-span-4 mt-8 md:mt-12"
        id="contact"
      >
        <Card mousePosition={mousePosition}>
          <div className="text-center py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Let's Build Something
                <span className="block text-[#ccff00] mt-2">Amazing Together</span>
              </h2>
              <p className="text-[#888] text-base md:text-lg mb-6 md:mb-8 max-w-[600px] mx-auto px-4">
                Currently open for freelance work and collaboration. Whether it's web development, digital art, or tech support - let's connect!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="mailto:kallel.ocu@gmail.com"
                  className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-[#050505] font-bold rounded-full hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </a>
                <button
                  onClick={() => onProjectClick('resume')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View Resume
                </button>
                <a
                  href="https://www.linkedin.com/in/ianocumen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-[#333] text-white font-bold rounded-full hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/IanKallelOcumen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-[#333] text-white font-bold rounded-full hover:border-[#ccff00] hover:text-[#ccff00] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </div>
              
              {/* Contact Info Display */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#888] pt-6 border-t border-white/10 max-w-[600px] mx-auto">
                <a href="mailto:kallel.ocu@gmail.com" className="hover:text-[#ccff00] transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  kallel.ocu@gmail.com
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="https://www.linkedin.com/in/ianocumen/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  /ianocumen
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="https://github.com/IanKallelOcumen" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  @IanKallelOcumen
                </a>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.main>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative h-full min-h-[60px] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-105"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[rgba(18,18,18,0.6)] backdrop-blur-md" />
      <div className="absolute inset-0 bg-[#ccff00] translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0" />
      
      {/* Icon */}
      <div className="relative z-10 text-[#888] group-hover:text-[#050505] transition-colors duration-300">
        {icon}
      </div>
    </a>
  );
}

function ToolCard({ icon, title, tools }: { icon: React.ReactNode; title: string; tools: string[] }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm md:text-base font-bold">{title}</h3>
      </div>
      <div className="space-y-1">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full" />
            <p className="text-xs md:text-sm text-[#888]">{tool}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCardHorizontal({ icon, title, tools, color }: { icon: string; title: string; tools: string; color: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-2xl" style={{ color }}>{icon}</div>
        <h3 className="text-sm md:text-base font-bold">{title}</h3>
      </div>
      <div className="space-y-1">
        {tools.split(' • ').map((tool, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full" />
            <p className="text-xs md:text-sm text-[#888]">{tool}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-[#888]">{description}</p>
      </div>
    </div>
  );
}
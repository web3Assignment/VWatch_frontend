import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { Mail, Phone, Github, Linkedin, ExternalLink, Code2, Database, Layout, Server, Cloud, Shield, Award, Calendar, ChevronRight } from 'lucide-react';

export const HireMePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techSkills = [
    { category: "Frontend", icon: <Layout className="w-5 h-5" />, skills: ["ReactJS", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "HTML/CSS"] },
    { category: "Backend", icon: <Server className="w-5 h-5" />, skills: ["Node.js", "ExpressJS", "Spring Boot", "Spring MVC", "Microservices", "Java"] },
    { category: "Database", icon: <Database className="w-5 h-5" />, skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
    { category: "DevOps & AWS", icon: <Cloud className="w-5 h-5" />, skills: ["Docker", "AWS (EC2, ECS, S3, RDS)", "CI/CD", "GitHub Actions", "NGINX"] },
    { category: "Realtime & Security", icon: <Shield className="w-5 h-5" />, skills: ["WebSockets", "Kafka", "RabbitMQ", "JWT", "OAuth"] },
  ];

  const experience = [
    {
      company: "Cloud Computing Cell",
      role: "Backend Developer",
      date: "Oct 2024 – Present",
      location: "Ghaziabad, India",
      points: [
        "Developed scalable services using Spring Boot and MongoDB Atlas",
        "Implemented robust JWT and OTP-based authentication systems",
        "Built and optimized REST APIs for seamless frontend integration",
        "Designed efficient NoSQL schemas for high-performance data handling"
      ]
    },
    {
      company: "MacroCosmos Creations Pvt Ltd",
      role: "Full Stack Developer Intern",
      date: "Nov 2025 – May 2026",
      location: "Bangalore, India",
      points: [
        "Architected full-stack features using React frontend and Node.js backend",
        "Managed MySQL production DB replicas, handling migrations, complex joins, and schema updates",
        "Implemented CI/CD pipelines and deployed on AWS EC2 using PM2 and GitHub Actions",
        "Integrated AI modules and prompt optimization for enhanced user experiences"
      ]
    }
  ];

  const projects = [
    {
      title: "Microservices Social Media Backend",
      tech: "Node.js, Redis, RabbitMQ, Docker, API Gateway",
      desc: "Scalable backend using microservices architecture. Handled User, Post, and Media services with asynchronous inter-service communication."
    },
    {
      title: "Scalable AWS Deployment",
      tech: "Docker, ECS Fargate, ALB, ACM, Nginx, ECR",
      desc: "Containerized and deployed backend on AWS ECS. Configured Application Load Balancer and auto-scaling for high availability."
    },
    {
      title: "QuizApp Platform",
      tech: "Spring Boot, MongoDB Atlas, JWT",
      desc: "Secure backend for an online quiz platform with JWT access/refresh tokens and robust admin management."
    },
    {
      title: "MyFinance Tracker",
      tech: "React, Spring Boot, PostgreSQL",
      desc: "Full-stack personal finance tracker with expense management and automated email reminders."
    }
  ];

  return (
    <div className="min-h-screen bg-frame p-2 md:p-4 flex flex-col font-body-md">
      <div className="flex-1 bg-background text-on-surface rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative">
        <Navbar />

        <main className="flex-1 max-w-full px-6 lg:px-16 2xl:px-24 py-12 w-full custom-scrollbar overflow-y-auto">
          
          {/* Hero Section */}
          <section className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 mb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-mono text-xs uppercase tracking-widest font-bold">
                <Code2 className="w-4 h-4" /> Available for Hire
              </div>
              
              <h1 className="font-display-lg text-5xl lg:text-7xl font-bold tracking-tight text-on-surface leading-tight">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-shimmer-text bg-[length:200%_auto]">Saurabh Srivastav</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                A passionate Full Stack & Backend Developer specializing in scalable architectures, microservices, and modern web experiences. Currently pursuing B.Tech in CSE at Ajay Kumar Garg Engineering College (GPA: 8.72).
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a href="mailto:saurabhsri.mau@gmail.com" className="flex items-center gap-2 bg-frame text-cream-on-frame px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg shadow-black/10 font-label-mono text-sm">
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                <a href="tel:+916306259516" className="flex items-center gap-2 bg-surface-container-high text-on-surface px-6 py-3 rounded-full hover:bg-surface-container-highest transition-colors font-label-mono text-sm border border-outline-variant">
                  <Phone className="w-4 h-4" /> +91 6306259516
                </a>
                <div className="flex items-center gap-3 ml-2">
                  <a href="#" className="p-3 bg-surface-container-high rounded-full hover:text-primary transition-colors border border-outline-variant"><Github className="w-5 h-5" /></a>
                  <a href="#" className="p-3 bg-surface-container-high rounded-full hover:text-primary transition-colors border border-outline-variant"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="w-full max-w-[400px] aspect-square rounded-[40px] bg-gradient-to-br from-surface-container-high to-surface-container border border-outline shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-background shadow-inner">
                  <span className="font-display-lg text-4xl text-on-surface-variant font-bold">SS</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-surface/80 backdrop-blur-md border border-outline/50 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">LOCATION</p>
                  <p className="font-label-mono text-xs font-bold text-on-surface">Ghaziabad, India</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-32">
            <h2 className="font-display-lg text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="text-primary"><Calendar className="w-8 h-8" /></span> Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-outline before:to-transparent">
              {experience.map((exp, idx) => (
                <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} style={{transitionDelay: `${idx * 200}ms`}}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-cream-on-frame shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="material-symbols-outlined text-[16px]">work</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-surface border border-outline shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg text-on-surface">{exp.role}</h3>
                      <span className="font-label-mono text-xs bg-surface-container-high px-2 py-1 rounded text-primary">{exp.date}</span>
                    </div>
                    <p className="font-label-mono text-sm text-on-surface-variant mb-4">{exp.company} • {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant/80">
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Arsenal */}
          <section className="mb-32 bg-frame text-cream-on-frame rounded-[40px] p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="font-display-lg text-3xl font-bold mb-12 flex items-center gap-3 relative z-10">
              <span className="text-primary"><Code2 className="w-8 h-8" /></span> Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {techSkills.map((category, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 text-primary rounded-xl">{category.icon}</div>
                    <h3 className="font-label-mono text-sm font-bold tracking-wider uppercase text-white">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-label-mono text-cream-on-frame/80 hover:text-white hover:border-primary/50 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-32">
            <h2 className="font-display-lg text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="text-primary"><Layout className="w-8 h-8" /></span> Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div key={idx} className="group bg-surface border border-outline rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display-lg text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="font-label-mono text-xs text-primary mb-6">{proj.tech}</p>
                  <p className="text-on-surface-variant leading-relaxed text-sm">{proj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Activities & Achievements */}
          <section className="mb-20">
            <h2 className="font-display-lg text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="text-primary"><Award className="w-8 h-8" /></span> Activities & Achievements
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline rounded-2xl hover:border-primary/30 transition-colors">
                <div className="p-3 bg-surface rounded-xl border border-outline shadow-sm"><Award className="w-6 h-6 text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-on-surface">Runner-Up • Snowstorm Hackathon 2026</h4>
                  <p className="text-xs text-on-surface-variant font-label-mono mt-1">Backend Developer Role</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline rounded-2xl hover:border-primary/30 transition-colors">
                <div className="p-3 bg-surface rounded-xl border border-outline shadow-sm"><Award className="w-6 h-6 text-primary" /></div>
                <div>
                  <h4 className="font-bold text-on-surface">ET-AI Hackathon 2026</h4>
                  <p className="text-xs text-on-surface-variant font-label-mono mt-1">Full Stack Developer • Realtime WebSockets Integration</p>
                </div>
              </div>
            </div>
          </section>
          
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

import React from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'QuizApp Platform',
    description: 'Secure online quiz backend with JWT access/refresh tokens, role-based admin management, and MongoDB Atlas storage.',
    techStack: ['Spring Boot', 'MongoDB Atlas', 'JWT', 'REST API'],
    githubUrl: 'https://github.com/saurabh-srivastav',
  },
  {
    title: 'MyFinance Tracker',
    description: 'Full-stack personal finance application with expense management, analytics dashboards, and automated email reminders.',
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Email'],
    githubUrl: 'https://github.com/saurabh-srivastav',
  },
  {
    title: 'Scalable Backend on AWS',
    description: 'Containerized backend deployed on AWS ECS with Application Load Balancer, auto-scaling, SSL, and Nginx reverse proxy.',
    techStack: ['Docker', 'ECS Fargate', 'ALB', 'ACM', 'Nginx', 'ECR'],
    githubUrl: 'https://github.com/saurabh-srivastav',
  },
  {
    title: 'Microservices Social Media',
    description: 'Scalable microservices architecture handling User, Post, and Media services with async inter-service communication.',
    techStack: ['Node.js', 'Redis', 'RabbitMQ', 'Docker', 'API Gateway'],
    githubUrl: 'https://github.com/saurabh-srivastav',
  },
];

export const SelectedWork: React.FC = () => {
  return (
    <section className="my-16 md:my-24">
      <p
        className="font-label-mono text-xs uppercase tracking-widest font-bold mb-3"
        style={{ color: 'var(--primary)' }}
      >
        Selected Work
      </p>
      <h2
        className="font-display-lg text-3xl md:text-4xl font-bold mb-12 tracking-tight"
        style={{ color: 'var(--on-surface)' }}
      >
        Real projects, real impact
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
    </section>
  );
};

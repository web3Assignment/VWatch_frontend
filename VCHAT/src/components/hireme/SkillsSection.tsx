import React, { useEffect, useRef, useState } from 'react';
import { SkillCategoryCard } from './SkillCategoryCard';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'C', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    variant: 'grid' as const,
  },
  {
    title: 'Frontend',
    skills: ['ReactJS', 'Tailwind CSS', 'Zustand', 'TanStack Query'],
    variant: 'grid' as const,
  },
  {
    title: 'Backend',
    skills: ['NodeJS', 'ExpressJS', 'Spring Boot', 'Spring MVC', 'Microservices'],
    variant: 'grid' as const,
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    variant: 'grid' as const,
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'GitHub', 'AWS', 'CI/CD', 'GitHub Actions', 'Postman'],
    variant: 'grid' as const,
  },
  {
    title: 'AWS Services',
    skills: ['EC2', 'RDS', 'ECR', 'ECS', 'ALB', 'Bastion Host', 'ACM', 'SSL', 'Lambda', 'S3', 'NGINX'],
    variant: 'marquee' as const,
  },
  {
    title: 'Auth',
    skills: ['JWT', 'OAuth', 'reCAPTCHA', 'Rate Limiting'],
    variant: 'grid' as const,
  },
  {
    title: 'Realtime',
    skills: ['Kafka', 'RabbitMQ', 'MQTT', 'WebSocket', 'SSE'],
    variant: 'grid' as const,
  },
];

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('[data-skill-card]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-skill-card'));
            setVisibleCards((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="my-16 md:my-24">
      <p
        className="font-label-mono text-xs uppercase tracking-widest font-bold mb-3"
        style={{ color: 'var(--primary)' }}
      >
        Technical Arsenal
      </p>
      <h2
        className="font-display-lg text-3xl md:text-4xl font-bold mb-12 tracking-tight"
        style={{ color: 'var(--on-surface)' }}
      >
        Skills &amp; technologies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((category, idx) => (
          <div key={category.title} data-skill-card={idx}>
            <SkillCategoryCard
              title={category.title}
              skills={category.skills}
              animationDelay={idx * 120}
              variant={category.variant}
              isVisible={visibleCards.has(idx)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

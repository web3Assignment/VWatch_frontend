import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { GlassCard } from '../components/shared/GlassCard';
import { Button } from '../components/shared/Button';
import { Link } from 'react-router-dom';

export const ShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label-caps text-[11px] mb-6 uppercase tracking-wider border border-primary/20">
              Full-Stack Intern Showcase
            </span>
            <h1 className="font-display-lg text-4xl lg:text-[56px] leading-tight mb-6 text-on-surface max-w-4xl">
              Engineering the Sync: <br />
              <span className="text-primary relative inline-block">
                Why Hire Me?
                <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-ping" />
              </span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
              Full-stack engineer specializing in high-performance, real-time collaborative systems across a diverse portfolio of web applications.
            </p>
          </motion.div>
        </section>

        {/* Bento Technical Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          <GlassCard className="md:col-span-6 p-8 group hover:border-primary/50 transition-all">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-2xl">sync_alt</span>
            </div>
            <h3 className="font-headline-sm text-2xl mb-4 text-on-surface">High-Performance Sync Engine</h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Extensive experience designing WebSocket architectures and real-time state synchronization engines that handle high-concurrency environments with sub-20ms latency.
            </p>
          </GlassCard>

          <GlassCard className="md:col-span-6 p-8 group hover:border-tertiary/50 transition-all">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center mb-6 border border-tertiary/20">
              <span className="material-symbols-outlined text-2xl">architecture</span>
            </div>
            <h3 className="font-headline-sm text-2xl mb-4 text-on-surface">SOLID & Scalable Architecture</h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Clean separation of concerns with decoupled service layers, custom React hooks, strict TypeScript payload contracts, and robust state providers.
            </p>
          </GlassCard>

          <GlassCard withLuminousBorder className="md:col-span-12 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-on-primary font-display-lg text-xl font-bold shadow-lg">
                V
              </div>
              <div>
                <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Flagship Demo Project</span>
                <h2 className="font-headline-sm text-2xl font-bold text-on-surface">Proof of Work: VWatch Platform</h2>
              </div>
            </div>

            <p className="font-body-lg text-on-surface mb-6">
              VWatch serves as a comprehensive demonstration of UI excellence, role-based access control, and low-latency synchronization.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <li className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="font-body-md text-sm text-on-surface">Sub-millisecond WebSocket playback sync with YouTube IFrame API.</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="font-body-md text-sm text-on-surface">Granular RBAC system (Host, Moderator, Participant, Viewer).</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="font-body-md text-sm text-on-surface">Seamless dark/light theme switching powered by dynamic CSS variables.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button variant="primary" icon={<span className="material-symbols-outlined">play_arrow</span>}>
                  Launch Interactive Demo
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>

        {/* Call to Action Banner */}
        <section className="glass-card p-10 md:p-14 rounded-3xl text-center relative overflow-hidden bg-primary-container/10 border border-primary/30">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface">Let's Build Something Synchronized</h2>
            <p className="font-body-lg text-on-surface-variant">
              Ready to bring precision engineering and cinematic design to your team?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/dashboard">
                <Button variant="primary" className="px-8 py-3.5">
                  Try VWatch Platform
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

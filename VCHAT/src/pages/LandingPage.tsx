import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { GlassCard } from '../components/shared/GlassCard';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center px-6 lg:px-10 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
                <span className="font-label-caps text-[11px] uppercase tracking-wider">WebSocket Ultra-Sync</span>
              </div>
              
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-[60px] leading-tight text-on-surface">
                Precision Playback.<br />
                <span className="text-primary">Zero Drift.</span>
              </h1>
              
              <p className="font-body-lg text-lg text-on-surface-variant max-w-lg">
                The world’s most accurate collaborative watching experience. Sync YouTube streams across continents with sub-millisecond precision. Professional controls for a cinematic party.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {user ? (
                  <Link to="/dashboard">
                    <Button variant="primary" className="px-8 py-4 text-base" icon={<span className="material-symbols-outlined">arrow_forward</span>}>
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button variant="primary" className="px-8 py-4 text-base" icon={<span className="material-symbols-outlined">play_arrow</span>}>
                      Start Watching Now
                    </Button>
                  </Link>
                )}
                <Link to="/showcase">
                  <Button variant="outline" className="px-8 py-4 text-base">
                    View Demo & Showcase
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/30">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center font-bold text-xs text-primary">JD</div>
                  <div className="w-9 h-9 rounded-full bg-tertiary/20 border-2 border-background flex items-center justify-center font-bold text-xs text-tertiary">SK</div>
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 border-2 border-background flex items-center justify-center font-bold text-xs text-purple-400">AM</div>
                </div>
                <p className="font-label-mono text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">12,400+</span> synchronized sessions today
                </p>
              </div>
            </motion.div>

            {/* Hero Visual Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <GlassCard withLuminousBorder className="p-4 shadow-2xl">
                <div className="aspect-video rounded-2xl overflow-hidden relative group bg-surface-container flex items-center justify-center border border-outline-variant/30">
                  <div className="text-center p-6">
                     <span className="material-symbols-outlined text-[64px] text-primary/70 mb-3 animate-pulse">movie</span>
                     <p className="font-headline-sm text-lg text-on-surface font-bold">Interstellar Live Sync</p>
                     <p className="font-label-mono text-xs text-on-surface-variant mt-1">4K Ultra HD • WebSocket 12ms Latency</p>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
                      <span className="material-symbols-outlined text-3xl">play_arrow</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-label-mono text-xs text-on-surface font-bold">Live Room: Interstellar HDR</span>
                  </div>
                  <div className="flex gap-2 font-label-caps text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold">4K</span>
                    <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/20 font-bold">HDR</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-20 px-6 lg:px-10 bg-surface-container-low/30 border-y border-outline-variant/30">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Platform Core</span>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">Engineered for Perfection</h2>
              <p className="font-body-md text-on-surface-variant">The technical backbone that powers your global watch parties, built with performance-first architecture.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Major Feature 1 */}
              <GlassCard className="md:col-span-8 p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">sync_alt</span>
                  </div>
                  <h3 className="font-headline-md text-2xl text-on-surface mb-3">WebSocket Ultra-Sync Protocol</h3>
                  <p className="font-body-md text-on-surface-variant max-w-lg leading-relaxed">
                    Our proprietary synchronization protocol ensures every participant sees exactly the same frame, at the exact same time, regardless of latency spikes or packet loss.
                  </p>
                </div>
                
                {/* Mock Visualization Bars */}
                <div className="mt-8 h-32 w-full bg-surface-container rounded-xl border border-outline-variant/30 flex items-end p-4 gap-3">
                  <div className="flex-1 bg-primary/30 rounded-t h-[40%]" />
                  <div className="flex-1 bg-primary/50 rounded-t h-[65%]" />
                  <div className="flex-1 bg-primary/80 rounded-t h-[80%]" />
                  <div className="flex-1 bg-primary rounded-t h-[95%]" />
                  <div className="flex-1 bg-primary/80 rounded-t h-[75%]" />
                  <div className="flex-1 bg-primary/50 rounded-t h-[50%]" />
                  <div className="flex-1 bg-primary/30 rounded-t h-[35%]" />
                </div>
              </GlassCard>

              {/* Side Card 1 */}
              <GlassCard className="md:col-span-4 p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div>
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                  </div>
                  <h3 className="font-headline-md text-2xl text-on-surface mb-3">Role-Based Control</h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    Granular permissions for hosts (Host, Moderator, Participant, Viewer). Control who can play, pause, or change video.
                  </p>
                </div>
                <div className="pt-6">
                  <Link to="/showcase" className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Explore Permissions <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </GlassCard>

              {/* Feature Card 2 */}
              <GlassCard className="md:col-span-4 p-8">
                <div className="w-12 h-12 bg-tertiary/10 border border-tertiary/20 text-tertiary rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">high_quality</span>
                </div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Lossless Audio & HD</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Bit-perfect audio passthrough support with zero compression artifacts for cinematic sound setups.
                </p>
              </GlassCard>

              {/* Feature Card 3 */}
              <GlassCard className="md:col-span-8 p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="font-headline-md text-2xl text-on-surface">Multi-Source Media Engine</h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    Seamlessly load YouTube videos, live streams, and interactive links without ever dropping synchronization.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 font-label-caps text-xs">
                    <span className="px-3 py-1 bg-surface-container rounded-full border border-outline-variant/30 text-on-surface">YouTube API</span>
                    <span className="px-3 py-1 bg-surface-container rounded-full border border-outline-variant/30 text-on-surface">Live Stream</span>
                    <span className="px-3 py-1 bg-surface-container rounded-full border border-outline-variant/30 text-on-surface">WebSocket Gateway</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/10 to-tertiary/10 border border-primary/30 rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface mb-4">Experience the VWatch Sync</h2>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
              Join thousands of users who have redefined their shared viewing experience. Start your first synchronized room in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" className="px-8 py-3.5 text-base">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="px-8 py-3.5 text-base">
                  Enter Dashboard
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

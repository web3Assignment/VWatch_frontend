import React from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { GlassCard } from '../components/shared/GlassCard';
import { Button } from '../components/shared/Button';
import { Link } from 'react-router-dom';

export const PremiumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-frame p-2 md:p-4 flex flex-col font-body-md">
      <div className="flex-1 bg-background text-on-surface rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-[11px] uppercase tracking-[0.15em] border border-primary/20">
            VWatch Premium
          </span>
          <h1 className="font-display-lg text-4xl lg:text-5xl text-on-surface tracking-tight">
            Elevate Your Watch Party Experience
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Unlock 4K Ultra-Sync, unlimited host rooms, custom branding, and spatial audio support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Free Tier */}
          <GlassCard className="p-8 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Free Tier</span>
              <h3 className="font-headline-sm text-2xl text-on-surface mt-2 mb-4">Standard Party</h3>
              <p className="font-display-lg text-4xl text-on-surface mb-6">$0 <span className="text-sm font-normal text-on-surface-variant">/forever</span></p>
              
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant mb-8">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Up to 10 participants per room
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  720p HD Video Sync
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Basic Role Controls
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Real-time Room Chat
                </li>
              </ul>
            </div>

            <Link to="/register">
              <Button variant="outline" fullWidth>Get Started Free</Button>
            </Link>
          </GlassCard>

          {/* Pro Tier (Featured) */}
          <GlassCard withLuminousBorder className="p-8 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-caps text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">
              Most Popular
            </div>

            <div>
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-wider">Pro Pass</span>
              <h3 className="font-headline-sm text-2xl text-on-surface mt-2 mb-4">Cinema Master</h3>
              <p className="font-display-lg text-4xl text-primary mb-6">$9.99 <span className="text-sm font-normal text-on-surface-variant">/month</span></p>
              
              <ul className="space-y-3 font-body-md text-sm text-on-surface mb-8">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Up to 100 participants per room
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  4K Ultra HD & HDR Sync Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Advanced Role Assignment & Transfer
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Lossless Audio & Spatial Passthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Custom Room URLs & Custom Backgrounds
                </li>
              </ul>
            </div>

            <Link to="/register">
              <Button variant="primary" fullWidth>Start 14-Day Free Trial</Button>
            </Link>
          </GlassCard>

          {/* Enterprise / Creator Tier */}
          <GlassCard className="p-8 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Creator Tier</span>
              <h3 className="font-headline-sm text-2xl text-on-surface mt-2 mb-4">Event Streamer</h3>
              <p className="font-display-lg text-4xl text-on-surface mb-6">$29.99 <span className="text-sm font-normal text-on-surface-variant">/month</span></p>
              
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant mb-8">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Unlimited Participants (1,000+)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Dedicated Sub-10ms WebSocket Server
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  Stream Embeds & Custom Player API
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span>
                  24/7 Priority VIP Support
                </li>
              </ul>
            </div>

            <Link to="/register">
              <Button variant="outline" fullWidth>Contact Sales</Button>
            </Link>
          </GlassCard>
        </div>
      </main>

      </div>
    </div>
  );
};

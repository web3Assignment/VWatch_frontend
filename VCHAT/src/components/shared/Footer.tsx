import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 max-w-7xl mx-auto">
        <div className="space-y-4">
          <span className="font-display-lg text-[24px] text-on-surface">VWatch</span>
          <p className="font-label-mono text-[12px] text-on-surface-variant max-w-sm">
            © 2026 VWatch. Real-time Cinematic Synchronization. Built for the next generation of shared experiences.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-label-caps text-on-surface uppercase opacity-50 text-[10px]">Platform</h4>
            <ul className="space-y-2 font-label-mono text-[12px]">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">API Status</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-on-surface uppercase opacity-50 text-[10px]">Social</h4>
            <ul className="space-y-2 font-label-mono text-[12px]">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">GitHub</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

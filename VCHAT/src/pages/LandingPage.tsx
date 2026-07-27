import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useThemeStore } from '../store/useThemeStore';
import { Sun, Moon, ChevronRight, Play } from 'lucide-react';
import { Footer } from '../components/shared/Footer';

const InvertedCorner = ({ className }: { className: string }) => (
  <div className={`absolute w-8 h-8 bg-transparent pointer-events-none ${className}`} />
);

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const [isCrazyMode, setIsCrazyMode] = useState(false);



  return (
    <div className="min-h-screen bg-frame p-2 md:p-4 flex flex-col font-body-md">
      {/* Main Cream Panel */}
      <div className="relative flex-1 bg-background rounded-[32px] overflow-hidden flex flex-col min-h-[90vh]">
        
        {/* CUTOUT: TOP LEFT (Logo) */}
        <div className="absolute top-0 left-0 bg-frame rounded-br-[32px] p-5 md:p-6 pr-8 md:pr-10 pb-6 md:pb-8 z-20">
          <Link to="/" className="text-cream-on-frame font-display-lg text-xl md:text-2xl flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">V</span>
            VWATCH
          </Link>
          <InvertedCorner className="top-0 -right-8 rounded-tl-[32px] shadow-[-16px_-16px_0_16px_var(--frame)]" />
          <InvertedCorner className="-bottom-8 left-0 rounded-tl-[32px] shadow-[-16px_-16px_0_16px_var(--frame)]" />
        </div>

        {/* CUTOUT: TOP RIGHT (Theme & Auth) */}
        <div className="absolute top-0 right-0 bg-frame rounded-bl-[32px] p-5 md:p-6 pl-8 md:pl-10 pb-6 md:pb-8 z-20 flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-cream-on-frame hover:bg-white/10 transition-colors font-label-mono text-xs"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">Theme</span>
          </button>
          {user ? (
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-cream-on-frame hover:bg-white/10 transition-colors font-label-mono text-xs">
               Dashboard
               <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link to="/register" className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream-on-frame text-frame font-bold hover:bg-white transition-colors font-label-mono text-xs">
               <span className="w-5 h-5 rounded-full bg-frame text-cream-on-frame flex items-center justify-center">
                 <ChevronRight className="w-3 h-3" />
               </span>
               Let's Connect
            </Link>
          )}
          <InvertedCorner className="top-0 -left-8 rounded-tr-[32px] shadow-[16px_-16px_0_16px_var(--frame)]" />
          <InvertedCorner className="-bottom-8 right-0 rounded-tr-[32px] shadow-[16px_-16px_0_16px_var(--frame)]" />
        </div>

        {/* CUTOUT: BOTTOM RIGHT (Crazy Mode Toggle) */}
        <div className="hidden md:flex absolute bottom-0 right-0 bg-frame rounded-tl-[32px] p-5 md:p-6 pl-8 md:pl-10 pt-6 md:pt-8 z-20 items-center gap-3">
          <span className="text-cream-on-frame/70 font-label-mono text-xs">Crazy mode:</span>
          <div className="flex bg-white/10 rounded-full p-1 gap-1 border border-white/20">
             <button 
               onClick={() => setIsCrazyMode(true)}
               className={`px-3 py-1 rounded-full text-xs font-label-mono transition-colors ${isCrazyMode ? 'bg-cream-on-frame text-frame font-bold' : 'text-cream-on-frame'}`}
             >
               On
             </button>
             <button 
               onClick={() => setIsCrazyMode(false)}
               className={`px-3 py-1 rounded-full text-xs font-label-mono transition-colors ${!isCrazyMode ? 'bg-cream-on-frame text-frame font-bold' : 'text-cream-on-frame'}`}
             >
               Off
             </button>
          </div>
          <InvertedCorner className="bottom-0 -left-8 rounded-br-[32px] shadow-[16px_16px_0_16px_var(--frame)]" />
          <InvertedCorner className="-top-8 right-0 rounded-br-[32px] shadow-[16px_16px_0_16px_var(--frame)]" />
        </div>

        {/* --- INNER CONTENT --- */}
        <div className="flex-1 flex flex-col pt-32 pb-20 px-6 lg:px-24 relative z-10">
           {/* Center Action Capsule */}
           <div className="hidden md:flex justify-center mb-16">
              <div className="bg-surface rounded-full border border-outline p-1.5 flex items-center shadow-sm">
                <Link
                  to="/dashboard"
                  className="px-10 py-2.5 rounded-full bg-frame text-cream-on-frame font-label-mono text-sm font-bold shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-0.5 flex items-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
                  Enter the Platform
                </Link>
              </div>
           </div>

           {/* Hero Copy */}
           <div className="max-w-2xl mt-10 md:mt-0">
              <h1 className="font-display-lg text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-on-surface mb-8">
                There is a <br />
                <span className="flex items-center gap-4">
                  <span className="inline-flex shrink-0 w-[1.2em] h-[0.8em] bg-primary/20 rounded-2xl border-2 border-primary items-center justify-center relative overflow-hidden shadow-sm">
                     <span className="w-[45%] h-full bg-primary/30 absolute left-0" />
                     <Play className="w-8 h-8 text-primary relative z-10 ml-1" fill="currentColor" />
                  </span>
                  Better Way
                </span>
                to Watch.
              </h1>

              <div className="flex items-center gap-4 mb-8 group cursor-pointer w-fit">
                <span className="w-8 h-8 rounded-full bg-on-surface text-surface flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="font-label-mono text-sm text-on-surface border-b border-on-surface pb-0.5 font-bold">Start a room</span>
              </div>

              <div className="h-px w-full max-w-sm bg-outline mb-6" />

              <p className="font-body-md text-on-surface-variant max-w-md leading-relaxed text-sm">
                VWatch is a synchronized playback platform that ensures every participant is frame-perfect in sync, avoiding costly buffers and desyncs.
              </p>
           </div>
        </div>

        {/* 3D Illustration / Graphic */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[5%] lg:right-[10%] w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] pointer-events-none opacity-20 lg:opacity-100 z-0 lg:z-10">
           <div className="relative w-full h-full flex items-center justify-center">
              {/* Back layer */}
              <div className="absolute w-[75%] h-[55%] bg-surface-container-high border border-outline rounded-3xl -rotate-12 translate-y-12 shadow-2xl" />
              {/* Middle layer */}
              <div className="absolute w-[75%] h-[55%] bg-primary/10 border border-primary/20 rounded-3xl -rotate-6 translate-y-6 shadow-2xl backdrop-blur-md" />
              {/* Front layer */}
              <div className="absolute w-[75%] h-[55%] bg-on-surface rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] flex items-center justify-center border-4 border-surface overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                 <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
                   <Play className="w-10 h-10 text-on-primary ml-1" fill="currentColor" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-2 md:mt-4">
        <Footer />
      </div>
    </div>
  );
};

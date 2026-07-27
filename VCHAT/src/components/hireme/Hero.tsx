import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Mail, Download, ChevronDown, MapPin, Briefcase } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const CodeChefIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.188-.348.467-.45.74-.115.313-.21.641-.397.924a2.22 2.22 0 01-.584.58c-.283.2-.6.352-.883.541-.26.174-.484.404-.62.69-.136.284-.182.607-.196.923-.02.468.034.94-.018 1.406-.048.436-.206.862-.193 1.302.005.187.043.372.07.557.039.266.028.536.028.805v1.302c0 .408.024.822-.04 1.227-.064.408-.216.8-.2 1.213.013.39.153.757.282 1.12.092.26.15.535.24.8.088.26.2.515.341.749.147.243.329.46.52.66.373.392.778.755 1.207 1.08.37.28.756.54 1.155.78.406.243.833.44 1.272.604.396.148.802.26 1.206.388.248.08.494.174.744.244a6.98 6.98 0 002.017.253c.462-.005.91-.096 1.354-.205.387-.096.762-.226 1.143-.342.396-.122.79-.256 1.166-.427.387-.178.768-.373 1.107-.627.357-.267.648-.605.949-.913.284-.29.575-.577.81-.912.214-.303.37-.643.496-.992.109-.3.175-.615.264-.923.087-.298.18-.597.226-.907.04-.268.013-.54.013-.81v-.937c0-.374.013-.748-.003-1.122a3.39 3.39 0 00-.182-.97c-.087-.257-.22-.496-.348-.736-.207-.39-.387-.8-.636-1.166-.247-.363-.58-.673-.877-1.003a3.6 3.6 0 00-.54-.47c-.187-.138-.39-.244-.59-.355a5.6 5.6 0 01-.592-.39 1.93 1.93 0 01-.395-.435c-.115-.175-.19-.373-.283-.56a2.68 2.68 0 00-.362-.552 1.39 1.39 0 00-.606-.373c-.22-.074-.452-.1-.684-.1H13.2a4.44 4.44 0 00-.94.088c-.29.072-.572.186-.835.327-.355.19-.68.438-.944.74-.198.226-.36.482-.47.762-.063.156-.088.32-.1.486 0 .017-.005.034-.005.052v.053c0 .013.002.026.005.04l.005.037c.002.02.007.04.013.06l.013.047c.005.02.012.038.02.058l.018.047.024.054.024.047.028.05.03.046.034.05.034.04.038.046c.013.014.026.03.04.042l.042.04.044.037.048.037.05.033.05.03.054.024.053.023.054.018.056.014.054.01.052.006H12.3c.02 0 .038-.003.057-.005l.048-.008.052-.013.048-.015.05-.02.047-.023.045-.025.044-.028.04-.03.04-.034.036-.035.034-.038.032-.04.028-.04.026-.044.022-.043.02-.046.015-.046.013-.048.008-.047.005-.048.002-.046v-.002c0-.016-.002-.03-.004-.046l-.006-.046-.01-.047-.013-.046-.016-.046-.02-.045-.022-.043-.025-.042-.028-.04-.03-.04-.034-.036-.036-.035-.038-.032-.04-.03-.042-.026-.044-.024-.044-.02-.047-.017-.047-.013-.048-.01-.048-.005H12.05c-.013 0-.025.002-.037.004a.57.57 0 00-.1.025.448.448 0 00-.137.088c-.042.04-.073.09-.098.143-.04.087-.065.18-.087.274a1.04 1.04 0 01-.08.237.37.37 0 01-.131.15c-.058.04-.126.065-.196.074-.084.01-.17 0-.252-.018a1.27 1.27 0 01-.357-.134c-.095-.06-.17-.14-.243-.223a2.66 2.66 0 01-.271-.39 3.29 3.29 0 01-.252-.582c-.05-.15-.096-.3-.126-.456-.024-.123-.043-.247-.04-.373.003-.145.03-.288.08-.424.04-.112.1-.218.173-.313.136-.177.31-.322.496-.446.17-.113.355-.207.544-.285.258-.107.526-.183.8-.233.27-.049.545-.064.818-.063" />
  </svg>
);

const statCounters = [
  { label: 'Projects Built', value: 10 },
  { label: 'Months Experience', value: 12 },
  { label: 'Tech Stack', value: 30 },
];

const roles = [
  'Full Stack Developer',
  'Backend Developer',
  'DevOps Engineer',
  'System Designer',
  'Cloud Architect',
];

const TypewriterRole: React.FC = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
      {text}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm"
        style={{
          background: 'var(--primary)',
          animation: 'hireme-blink-cursor 0.8s step-end infinite',
        }}
      />
    </span>
  );
};

const AnimatedCounter: React.FC<{ target: number; suffix?: string; isVisible: boolean }> = ({
  target,
  suffix = '+',
  isVisible,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, target]);

  return (
    <span>{count}{suffix}</span>
  );
};

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magneticRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback(() => {
    const btn = magneticRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[85vh] flex flex-col justify-center relative pt-8 pb-16"
    >
      <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-60" />

      <div
        className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative w-full max-w-[300px] lg:max-w-[380px] shrink-0">
          <div className="relative group">
            <img
              src="/images/white.jpeg"
              alt="Saurabh"
              className="rounded-[32px] border w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ borderColor: 'var(--outline)' }}
            />

            <div
              className="absolute -inset-3 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0 blur-xl"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--tertiary))', opacity: 0 }}
            />

            <div
              className="absolute bottom-4 left-4 right-4 backdrop-blur-md border p-3 rounded-2xl flex items-center justify-between z-20"
              style={{
                background: 'var(--glass-bg)',
                borderColor: 'var(--glass-border)',
              }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                <span className="font-label-mono text-[11px] font-bold" style={{ color: 'var(--on-surface)' }}>
                  Ghaziabad, India
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--tertiary)' }} />
                  <div className="absolute inset-0 w-2 h-2 rounded-full hireme-pulse-ring" style={{ background: 'var(--tertiary)' }} />
                </div>
                <span className="font-label-mono text-[10px]" style={{ color: 'var(--tertiary)' }}>
                  Available
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute -top-5 -right-5 w-14 h-14 rounded-2xl rotate-12 hireme-float-accent-1"
            style={{ background: 'var(--primary)', opacity: 0.15 }}
          />
          <div
            className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full hireme-float-accent-2"
            style={{ background: 'var(--tertiary)', opacity: 0.15 }}
          />
          <div
            className="absolute top-1/4 -right-6 w-6 h-6 rounded-lg rotate-45 hireme-float-accent-3"
            style={{ background: 'var(--secondary)', opacity: 0.12 }}
          />
        </div>

        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'var(--surface-container)',
              borderColor: 'var(--outline)',
            }}
          >
            <Briefcase className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
            <span className="font-label-mono text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--primary)' }}>
              Open to Opportunities
            </span>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="font-display-lg font-bold tracking-tight leading-tight" style={{ color: 'var(--on-surface)' }}>
              <span className="text-3xl lg:text-4xl block mb-2" style={{ color: 'var(--on-surface-variant)' }}>Hello, </span>
              <span className="text-6xl lg:text-8xl block mb-4">I'm Saurabh</span>
              <span className="text-3xl lg:text-5xl block">
                <TypewriterRole />
              </span>
            </h1>
          </div>

          <p
            className={`text-lg max-w-xl leading-relaxed font-body-md mx-auto lg:mx-0 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ color: 'var(--on-surface-variant)' }}
          >
            Building scalable architectures, microservices, and modern web experiences with a focus on clean, production-ready code.
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-2 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              ref={magneticRef}
              href="mailto:saurabhsri.mau@gmail.com"
              className="hireme-magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-label-mono text-sm font-bold shadow-lg transition-shadow hover:shadow-xl relative overflow-hidden group"
              style={{
                background: 'var(--primary)',
                color: 'var(--on-primary)',
              }}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--tertiary))' }}
              />
              <Mail className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Hire Me</span>
            </a>

            <a
              href="/resume/Saurabh_Srivastav_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-label-mono text-sm font-bold border transition-all hover:shadow-md"
              style={{
                background: 'var(--surface-container)',
                color: 'var(--on-surface)',
                borderColor: 'var(--outline)',
              }}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div
            className={`flex items-center gap-3 justify-center lg:justify-start pt-2 transition-all duration-700 delay-[900ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <SocialIcon href="https://github.com/Saurabh12325" label="GitHub">
              <GithubIcon className="w-5 h-5" />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/saurabh-srivastav-ab7712285/" label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </SocialIcon>
            <SocialIcon href="https://codechef.com/users/saurabh_srivastav" label="CodeChef">
              <CodeChefIcon className="w-5 h-5" />
            </SocialIcon>
          </div>

          <div
            className={`grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 transition-all duration-700 delay-[1100ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {statCounters.map((stat) => (
              <div
                key={stat.label}
                className="text-center lg:text-left p-3 rounded-2xl border"
                style={{
                  background: 'var(--surface-container)',
                  borderColor: 'var(--outline)',
                }}
              >
                <p className="font-display-lg text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  <AnimatedCounter target={stat.value} isVisible={isVisible} />
                </p>
                <p className="font-label-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hireme-scroll-indicator">
        <ChevronDown className="w-6 h-6" style={{ color: 'var(--on-surface-variant)' }} />
      </div>
    </section>
  );
};

const SocialIcon: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:text-primary hover:scale-110 hover:shadow-md"
    style={{
      background: 'var(--surface-container)',
      borderColor: 'var(--outline)',
      color: 'var(--on-surface-variant)',
    }}
  >
    {children}
  </a>
);

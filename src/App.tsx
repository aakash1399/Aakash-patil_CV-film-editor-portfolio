import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Film,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ExternalLink,
  Play,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  MonitorPlay,
  Menu,
  X,
  Clapperboard,
  Sparkles,
  User,
  Target,
  Heart,
  Globe,
  Tv,
  Rocket,
  Link2,
} from 'lucide-react';

/* ─── Helpers ─────────────────────────────────────────────── */
function getYouTubeId(url: string) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

function getYouTubeThumb(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

/* ─── Intersection Observer hook ──────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Data ────────────────────────────────────────────────── */

interface FilmItem {
  name: string;
  url: string;
}

interface ShowreelItem {
  title: string;
  url: string;
}

const HOLLYWOOD: FilmItem[] = [
  { name: 'Aquaman', url: 'https://www.youtube.com/watch?v=WDkg3h8PCVU' },
  { name: 'The Mule', url: 'https://www.youtube.com/watch?v=nUiq3WJnBDI' },
  { name: 'Liberation', url: 'https://www.youtube.com/watch?v=x7pfDvCcrYY' },
];

const BOLLYWOOD: FilmItem[] = [
  { name: 'Kabir Singh', url: 'https://www.youtube.com/watch?v=RiANSSgCuJk' },
  { name: 'Super 30', url: 'https://www.youtube.com/watch?v=QpvEWVVnICE' },
  { name: 'Chhichhore', url: 'https://www.youtube.com/watch?v=tsxemFX0a7k' },
  { name: 'Dabangg 3', url: 'https://www.youtube.com/watch?v=-AJ7cLi1Jfk' },
  { name: 'Housefull 4', url: 'https://www.youtube.com/watch?v=gcHH34cEl3Y' },
  { name: 'Race 3', url: 'https://www.youtube.com/watch?v=xBht9TG7ySw' },
  { name: 'The Sky Is Pink', url: 'https://www.youtube.com/watch?v=prwUFBsDRLk' },
  { name: 'Manikarnika', url: 'https://www.youtube.com/watch?v=tKmkMVaNu9g' },
  { name: 'Luka Chuppi', url: 'https://www.youtube.com/watch?v=SVj26LvQMPA' },
  { name: 'Sonchiriya', url: 'https://www.youtube.com/watch?v=aejAkKGiimk' },
  { name: 'Notebook', url: 'https://www.youtube.com/watch?v=SXYxOCLc9-c' },
  { name: 'Section 375', url: 'https://www.youtube.com/watch?v=UWjxS8EJ4Z8' },
  { name: 'Student of the Year 2', url: 'https://www.youtube.com/watch?v=QZsthdsh6yk' },
  { name: "India's Most Wanted", url: 'https://www.youtube.com/watch?v=xmab5E_62og' },
  { name: 'Pal Pal Dil Ke Paas', url: 'https://www.youtube.com/watch?v=1XW49GYRtJ0' },
  { name: 'Jalebi', url: 'https://www.youtube.com/watch?v=exF94JTVy8k' },
  { name: 'Pataakha', url: 'https://www.youtube.com/watch?v=cDsfX4CK9EY' },
  { name: 'Why Cheat India', url: 'https://www.youtube.com/watch?v=2B6vjua8aK4' },
];

const LATEST: FilmItem[] = [
  { name: 'Border 2', url: 'https://www.youtube.com/watch?v=AZGfCK1yTTI' },
  { name: 'Ramayana', url: 'https://www.youtube.com/watch?v=1Xj_imJI0d4' },
  { name: 'Toxic', url: 'https://www.youtube.com/watch?v=0SYIByVkz5k' },
  { name: 'Dhurandhar: The Revenge', url: 'https://www.youtube.com/watch?v=NHk7scrb_9I' },
  { name: 'Thama', url: 'https://www.youtube.com/watch?v=Mod_oXpftJA' },
  { name: 'Ikkis', url: 'https://www.youtube.com/watch?v=ebAznVtYY84' },
  { name: 'Sky Force', url: 'https://www.youtube.com/watch?v=CgruxokrhjQ' },
  { name: 'Fighter', url: 'https://www.youtube.com/watch?v=6amIq_mP4xM' },
  { name: 'Kalki', url: 'https://www.youtube.com/watch?v=kQDd1AhGIHk' },
];

const WEB_SERIES: FilmItem[] = [
  { name: 'The Final Call', url: 'https://www.youtube.com/watch?v=ck_0nvtwklg' },
  { name: 'The Forgotten Army', url: 'https://www.youtube.com/watch?v=NG6PUj-TUfY' },
  { name: 'Leila', url: 'https://www.youtube.com/watch?v=5yxjRgwYymg' },
  { name: 'House Arrest', url: 'https://www.youtube.com/watch?v=Rzr4OPNZtY4' },
];

const SHOWREELS: ShowreelItem[] = [
  { title: 'Chhaava | VFX Breakdown | ReDefine', url: 'https://www.youtube.com/watch?v=op8YgJhJwCo' },
  { title: 'Those About To Die | VFX Breakdown | ReDefine', url: 'https://www.youtube.com/watch?v=qgqXnFDyKbM' },
  { title: 'International Showreel 2025 | ReDefine', url: 'https://www.youtube.com/watch?v=lji6yjMeAM4' },
  { title: 'Knights of the Zodiac | VFX Breakdown | ReDefine', url: 'https://www.youtube.com/watch?v=PWhj72wRA3c' },
  { title: 'Brahmāstra VFX Breakdown | ReDefine', url: 'https://www.youtube.com/watch?v=bkswjouWK2U' },
];

const COMMERCIALS = [
  'Mudra Yojana – 19 Films',
  'Polycab Wires Ad',
  'Isuzu Car Ad',
  'Fly Bags Ad',
  'Tata Tritvam Kochi Ad',
  'Cushion Massager Ad',
  'Chitrakoot (Subtitling)',
  '3D Experience Project',
];

const SKILLS = [
  { name: 'Final Cut Pro', level: 95 },
  { name: 'Adobe Premiere Pro', level: 95 },
  { name: 'Adobe Photoshop', level: 90, tag: 'Advanced' },
  { name: 'After Effects', level: 55, tag: 'Basic' },
  { name: 'Nuke', level: 50, tag: 'Basic' },
  { name: 'RV (Dailies Playback)', level: 85 },
  { name: 'Shotgun / Shot Tracking', level: 90 },
  { name: 'Offline & Online Edit Workflow', level: 95 },
];

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Filmography', href: '#filmography' },
  { label: 'Showreels', href: '#showreels' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Components ──────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#hero');
          }}
          className="font-bebas text-2xl tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
        >
          AAKASH PATIL
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(l.href);
              }}
              className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 tracking-wide uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gold-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gold-900/30 animate-fade-in">
          <div className="flex flex-col py-4 px-6 gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(l.href);
                }}
                className="text-sm font-medium text-gray-300 hover:text-gold-400 tracking-wide uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center mb-16">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
        <Icon className="text-gold-400" size={22} />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
      </div>
      <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="font-playfair italic text-gold-400 text-lg">{subtitle}</p>
      )}
    </div>
  );
}

function YouTubeCard({ item, aspect = 'video' }: { item: { name: string; url: string }; aspect?: 'video' | 'banner' }) {
  const thumb = getYouTubeThumb(item.url);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`thumb-hover group relative overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-gold-600/50 block ${
        aspect === 'banner' ? 'aspect-video' : 'aspect-video'
      }`}
    >
      <img
        src={thumb}
        alt={item.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Play overlay */}
      <div className="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg shadow-gold-500/30">
          <Play size={22} className="text-black ml-1" fill="black" />
        </div>
      </div>
      {/* Title bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
        <p className="text-sm font-medium text-white truncate">{item.name}</p>
      </div>
    </a>
  );
}

/* ─── Hero ────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="hero" className="hero-bg relative min-h-screen flex items-center justify-center film-grain overflow-hidden">
      {/* Decorative film strips */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-700/30 via-gold-500/50 to-gold-700/30" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-700/30 via-gold-500/50 to-gold-700/30" />

      {/* Perforations left */}
      <div className="hidden lg:flex flex-col gap-3 absolute left-4 top-1/2 -translate-y-1/2 opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="film-perf" />
        ))}
      </div>
      {/* Perforations right */}
      <div className="hidden lg:flex flex-col gap-3 absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="film-perf" />
        ))}
      </div>

      <div className="text-center px-4 relative z-10">
        {/* Film reel icon */}
        <div className="animate-fade-in mb-6">
          <Film className="mx-auto text-gold-400 animate-pulse" size={48} />
        </div>

        <p className="animate-fade-in-up font-inter text-sm sm:text-base tracking-[0.3em] uppercase text-gold-400 mb-4">
          Film Editor &amp; VFX Editor
        </p>

        <h1 className="animate-fade-in-up delay-200 font-bebas text-6xl sm:text-8xl lg:text-9xl tracking-wider text-white leading-none mb-6">
          AAKASH
          <br />
          <span className="text-gold-gradient">PATIL</span>
        </h1>

        <p className="animate-fade-in-up delay-400 font-playfair italic text-lg sm:text-xl text-gray-400 max-w-xl mx-auto mb-8">
          Transforming a director's vision into compelling visual storytelling through cinematic pacing, seamless transitions, and advanced post workflows.
        </p>

        <div className="animate-fade-in-up delay-500 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-gold-500" />
            +91 8080001101
          </span>
          <span className="hidden sm:inline text-gold-700">|</span>
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-gold-500" />
            Aakashpatil1997@gmail.com
          </span>
        </div>

        <div className="animate-fade-in-up delay-700 mt-12">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase mb-2">Scroll Down</span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────── */

function About() {
  const ref = useReveal();
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={User} title="ABOUT ME" subtitle="The Story Behind the Cuts" />
        <div ref={ref} className="reveal grid md:grid-cols-2 gap-12 items-start">
          {/* Left: profile card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                <span className="font-bebas text-2xl text-black">AP</span>
              </div>
              <div>
                <h3 className="font-bebas text-2xl tracking-wider text-white">Aakash Dattatray Patil</h3>
                <p className="text-gold-400 text-sm">Film Editor | VFX Editor</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gold-500 shrink-0" />
                <span>Uttur, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold-500 shrink-0" />
                <a href="mailto:Aakashpatil1997@gmail.com" className="hover:text-gold-400 transition-colors">
                  Aakashpatil1997@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold-500 shrink-0" />
                <a href="mailto:aakp@redefine.co" className="hover:text-gold-400 transition-colors">
                  aakp@redefine.co
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold-500 shrink-0" />
                <span>+91 8080001101</span>
              </div>
            </div>
          </div>
          {/* Right: profile + objective */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bebas text-xl tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                <Sparkles size={18} /> PROFESSIONAL PROFILE
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                A highly skilled <strong className="text-white">Film Editor and VFX Editor</strong> with extensive
                experience across <strong className="text-gold-300">Hollywood, Bollywood, web series, commercials,
                and branded content</strong>. Adept at transforming a director's vision into compelling visual
                storytelling through cinematic pacing, seamless transitions, advanced post workflows, and
                strong narrative rhythm.
              </p>
            </div>
            <div>
              <h3 className="font-bebas text-xl tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                <Target size={18} /> CAREER OBJECTIVE
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                To establish myself as a leading creative editor in the film and post-production industry
                by enhancing storytelling through <strong className="text-white">powerful edits, cinematic techniques,
                and visually immersive experiences</strong>.
              </p>
            </div>
            <div>
              <h3 className="font-bebas text-xl tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                <GraduationCap size={18} /> EDUCATION
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  <span><strong className="text-white">HSC</strong> – Mumbai Board</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  <span><strong className="text-white">Diploma in Digital Filmmaking</strong> – L.S. Raheja Technical Institute, Worli (2017–2018)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ───────────────────────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={Briefcase} title="EXPERIENCE" subtitle="The Reel Journey" />

        <div className="space-y-8">
          {/* DNEG */}
          <ExperienceCard
            company="DNEG (formerly ReDefine)"
            location="Mumbai"
            role="VFX Editor | Previs Editor | Showreel Editor"
            period="July 2020 – Present"
            highlights={[
              'Editing commercials, ad films, branded content, and digital campaigns',
              'Managing end-to-end post-production workflows',
              'Client communication and delivery management',
              'Created high-impact official studio showreels and VFX breakdowns for public releases and brand presence',
              'Designed before/after VFX breakdowns, individual shot edits, and project-wise official showreels for public release',
              'Built polished official showreels for ReDefine and DNEG, helping teams visually communicate post-production quality',
              'Edited Release Day Reels (trailer-style editorial pieces) for company launches, title releases, and studio promotions',
              'Since 2021, expanded into Previs Editing, delivering previs sequences for major titles including Ramayana, Fighter, Capsule Gill, and Knights of the Zodiac',
              'Edited animatics, animation cuts, sound design layers, SFX, and background music integration for previs storytelling',
            ]}
            current
          />

          {/* Prime Focus */}
          <ExperienceCard
            company="Prime Focus Limited"
            location="Mumbai"
            role="VFX Editor"
            period="Nov 2018 – June 2020"
            highlights={[
              'Ingesting plates and edit references',
              'Retiming and syncing references',
              'Shot tracking through Shotgun',
              'QC for client deliveries',
              'Managing offline edit updates',
              'Supported creation of VFX breakdown reels and before/after showreels for film, OTT, and studio presentations',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  company,
  location,
  role,
  period,
  highlights,
  current = false,
}: {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
  current?: boolean;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal card-hover relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 border ${
        current ? 'border-gold-600/40' : 'border-gray-800'
      } rounded-2xl p-6 sm:p-8`}
    >
      {current && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-gold-600 to-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Current
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="font-bebas text-2xl tracking-wider text-white">{company}</h3>
          <p className="text-gold-400 text-sm">{role}</p>
        </div>
        <div className="mt-2 sm:mt-0 text-right">
          <p className="text-gray-300 text-sm font-medium">{period}</p>
          <p className="text-gray-500 text-xs">{location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-gold-500 mt-1 shrink-0">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Filmography ─────────────────────────────────────────── */

type FilmTab = 'hollywood' | 'bollywood' | 'latest' | 'web';

function Filmography() {
  const [tab, setTab] = useState<FilmTab>('bollywood');
  const tabs: { key: FilmTab; label: string; icon: React.ElementType; data: FilmItem[] }[] = [
    { key: 'hollywood', label: 'Hollywood', icon: Globe, data: HOLLYWOOD },
    { key: 'bollywood', label: 'Bollywood', icon: Clapperboard, data: BOLLYWOOD },
    { key: 'latest', label: 'Latest / Upcoming', icon: Rocket, data: LATEST },
    { key: 'web', label: 'Web Series', icon: Tv, data: WEB_SERIES },
  ];
  const active = tabs.find((t) => t.key === tab)!;

  return (
    <section id="filmography" className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={Clapperboard} title="FILMOGRAPHY" subtitle="Credits on the Big Screen" />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  tab === t.key
                    ? 'tab-active shadow-lg shadow-gold-500/20'
                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gold-700/50 hover:text-gold-400'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {active.data.map((film, i) => (
            <div key={film.name + i} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <YouTubeCard item={film} />
            </div>
          ))}
        </div>

        {/* Commercial work */}
        <div className="mt-20">
          <h3 className="font-bebas text-2xl tracking-wider text-center text-white mb-8 flex items-center justify-center gap-3">
            <MonitorPlay size={20} className="text-gold-400" />
            COMMERCIAL & ADDITIONAL PROJECTS
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {COMMERCIALS.map((c) => (
              <span
                key={c}
                className="px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-gold-600/40 hover:text-gold-300 transition-all cursor-default"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Showreels ────────────────────────────────────────────── */

function Showreels() {
  return (
    <section id="showreels" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={Award} title="FEATURED SHOWREELS" subtitle="Official VFX Breakdowns & Reels" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWREELS.map((item, i) => (
            <ShowreelCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Portfolio link */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gold-900/30 via-gold-800/20 to-gold-900/30 border border-gold-700/30 rounded-2xl px-8 py-6">
            <div className="flex items-center gap-3">
              <Star className="text-gold-400" size={24} />
              <div className="text-left">
                <p className="text-white font-medium text-sm">Creative Portfolio</p>
                <p className="text-gray-400 text-xs">Short film Lakshmi • PSA on saving trees</p>
              </div>
            </div>
            <a
              href="https://drive.google.com/file/d/1Z_SiqozUDjGY5MbCtxp4SLNLczIGWi_k/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold px-5 py-2.5 rounded-full hover:from-gold-500 hover:to-gold-400 transition-all text-sm shadow-lg shadow-gold-500/20"
            >
              <ExternalLink size={16} />
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowreelCard({ item, index }: { item: ShowreelItem; index: number }) {
  const ref = useReveal();
  const thumb = getYouTubeThumb(item.url);
  return (
    <div
      ref={ref}
      className="reveal card-hover"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="thumb-hover group block overflow-hidden rounded-xl border border-gray-800 hover:border-gold-600/50 bg-gray-900/60"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumb}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg shadow-gold-500/30">
              <Play size={26} className="text-black ml-1" fill="black" />
            </div>
          </div>
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
            <Film size={12} className="text-gold-400" />
            <span className="text-xs text-gold-300 font-medium">VFX Breakdown</span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-sm font-medium text-white group-hover:text-gold-300 transition-colors line-clamp-2">
            {item.title}
          </h4>
        </div>
      </a>
    </div>
  );
}

/* ─── Skills ───────────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={MonitorPlay} title="SKILLS" subtitle="Tools of the Trade" />

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Core skills */}
        <div className="mt-12">
          <h3 className="font-bebas text-2xl tracking-wider text-center text-white mb-8">CORE COMPETENCIES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'Cinematic Storytelling', icon: Film },
              { label: 'Editing Rhythm & Pacing', icon: Clapperboard },
              { label: 'Team Collaboration', icon: Heart },
              { label: 'Creative Problem Solving', icon: Sparkles },
              { label: 'Post-Production Supervision', icon: MonitorPlay },
              { label: 'Client-Ready Finishing', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="card-hover flex flex-col items-center text-center bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-gold-600/40"
                >
                  <Icon size={24} className="text-gold-400 mb-2" />
                  <p className="text-xs text-gray-300 leading-tight">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths */}
        <div className="mt-16">
          <h3 className="font-bebas text-2xl tracking-wider text-center text-white mb-8">STRENGTHS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              'Fast learner with strong grasping ability',
              'Positive attitude and team player',
              'Strong work ethic and integrity',
              'Deadline-focused execution',
            ].map((s) => (
              <div
                key={s}
                className="bg-gradient-to-br from-gold-900/20 to-transparent border border-gold-800/30 rounded-xl p-4 text-center"
              >
                <p className="text-sm text-gray-300">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: { name: string; level: number; tag?: string }; index: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal bg-gray-900/60 border border-gray-800 rounded-xl p-4 card-hover"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-200 flex items-center gap-2">
          🎬 {skill.name}
        </span>
        {skill.tag && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              skill.tag === 'Advanced'
                ? 'bg-gold-500/20 text-gold-400'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {skill.tag}
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Contact ──────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle icon={Mail} title="GET IN TOUCH" subtitle="Let's Create Something Remarkable" />

        <div className="grid sm:grid-cols-2 gap-6">
          <a
            href="tel:+918080001101"
            className="card-hover flex items-center gap-4 bg-gray-900/80 border border-gray-800 hover:border-gold-600/40 rounded-xl p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
              <Phone className="text-gold-400" size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-white font-medium">+91 8080001101</p>
            </div>
          </a>

          <a
            href="mailto:Aakashpatil1997@gmail.com"
            className="card-hover flex items-center gap-4 bg-gray-900/80 border border-gray-800 hover:border-gold-600/40 rounded-xl p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
              <Mail className="text-gold-400" size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-white font-medium text-sm">Aakashpatil1997@gmail.com</p>
            </div>
          </a>

          <a
            href="mailto:aakp@redefine.co"
            className="card-hover flex items-center gap-4 bg-gray-900/80 border border-gray-800 hover:border-gold-600/40 rounded-xl p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
              <Mail className="text-gold-400" size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Work Email</p>
              <p className="text-white font-medium text-sm">aakp@redefine.co</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
              <MapPin className="text-gold-400" size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
              <p className="text-white font-medium">Uttur, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <User size={14} />
              DOB: 13 July 1997
            </span>
            <span>•</span>
            <span>Male</span>
            <span>•</span>
            <span>Indian National</span>
            <span>•</span>
            <span>Languages: Hindi, Marathi</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Film className="text-gold-500" size={20} />
            <span className="font-bebas text-lg tracking-wider text-gray-400">AAKASH PATIL</span>
          </div>
          <p className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} Aakash Dattatray Patil. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:Aakashpatil1997@gmail.com"
              className="text-gray-600 hover:text-gold-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://drive.google.com/file/d/1Z_SiqozUDjGY5MbCtxp4SLNLczIGWi_k/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-400 transition-colors"
              aria-label="Portfolio"
            >
              <Link2 size={18} />
            </a>
          </div>
        </div>
        <div className="section-divider mt-6 mb-4" />
        <p className="text-center text-[10px] text-gray-700 italic">
          The information provided on this portfolio is true to the best of my knowledge.
        </p>
      </div>
    </footer>
  );
}

/* ─── App ──────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Filmography />
      <div className="section-divider" />
      <Showreels />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </div>
  );
}

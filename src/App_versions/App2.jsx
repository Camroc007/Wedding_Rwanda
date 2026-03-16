// src/App.jsx — Masterclass Wedding Invitation
// Features: Cormorant Garamond luxury font · sticky nav with mobile menu ·
// smooth scroll · countdown timer · falling rose petals · grain texture overlay ·
// scroll-colour theme shift · lightbox gallery · RSVP form (Formspree) ·
// language toggle (EN / RW / PT) · parallax · zoom images · floating elements

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Heart, MapPin, Clock, Calendar, Flower2, Users, Camera, Church,
  Globe, Star, Sparkles, Cross, Stethoscope, House, GraduationCap,
  HandHeart, Menu, X, ChevronDown, Send, CheckCircle
} from 'lucide-react';

// ── Images — swap URLs for local imports when ready ───────────────────────────
import coupleImage     from './assets/couple.jpg';
import rwandaLandscape from './assets/butare_scene.jpeg';
import missionWork     from './assets/kids.jpg';
import portugalVillage from './assets/chamas.jpeg';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80', caption: 'Rwanda — Land of a Thousand Hills' },
  { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', caption: 'Butare, Rwanda' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', caption: 'Mission Work' },
  { src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80', caption: 'Torre de Dona Chama, Portugal' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', caption: 'Bragança Region' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', caption: 'Our Love Story' },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  EN: {
    lang: 'EN', flag: '🇬🇧',
    tagline: 'In the Name of the Father, Son & Holy Spirit',
    subtitle: 'Two Hearts, Two Cultures, One Love in Christ',
    invite: 'humbly request your presence and prayers as they unite in the Sacrament of Holy Matrimony across two celebrations',
    scroll: 'Continue your journey with us',
    nav: { rwanda: 'Rwanda', portugal: 'Portugal', gallery: 'Gallery', rsvp: 'RSVP' },
    countdown: { days: 'Days', hours: 'Hours', mins: 'Minutes', secs: 'Seconds', until: 'Until the Rwanda Ceremony' },
    rwanda: 'Holy Matrimony', rwandaSub: 'Rwanda — Land of a Thousand Hills',
    mission: 'Week of Mission', missionSub: 'Before our wedding celebration',
    portugal: 'Wedding Celebration in Portugal', portugalSub: 'Torre de Dona Chama, Bragança',
    journey: 'Journey Information', journeySub: 'Join us for this unique celebration of love and faith',
    gallery: 'Our Story in Images',
    gifts: 'Gifts of Love & Service',
    rsvpTitle: 'RSVP', rsvpDeadline: 'Please respond by 1st August 2026',
    rsvpForm: { name: 'Full Name', email: 'Email Address', attending: 'Which celebration(s) will you attend?',
      rwanda: 'Rwanda Ceremony (June 2027)', portugal: 'Portugal Celebration (Summer 2027)',
      mission: 'I would like to join the Mission Week', dietary: 'Dietary Requirements / Accessibility Needs',
      prayers: 'Special Prayer Intentions', submit: 'Send RSVP', sending: 'Sending…', sent: 'RSVP Received! God bless you.' },
    footer: 'Multiple cultures, one faith, infinite blessings',
    thanks: 'Muito obrigado · Murakoze cyane · Thank you very much · Go raibh míle maith agat',
  },
  RW: {
    lang: 'RW', flag: '🇷🇼',
    tagline: "Mu izina rya Data, Umwana n'Umwuka Wera",
    subtitle: 'Imitima ibiri, Imico ibiri, Urukundo rumwe muri Kristo',
    invite: "basaba ko muri kumwe kandi musengera hamwe igihe bateranya mu Sakaramentu y'Ubukwe Bwera mu birori bibiri",
    scroll: 'Komeza urugendo rwawe natwe',
    nav: { rwanda: 'Rwanda', portugal: 'Porutugali', gallery: 'Amafoto', rsvp: 'Igisubizo' },
    countdown: { days: 'Iminsi', hours: 'Amasaha', mins: 'Iminota', secs: 'Inzegaminota', until: 'Kugeza ku Misa yo Rwanda' },
    rwanda: 'Ubukwe Bwera', rwandaSub: 'Rwanda — Igihugu cy\'Imisozi Igihumbi',
    mission: 'Icyumweru cy\'Ubutume', missionSub: 'Mbere y\'ubukwe bwacu',
    portugal: 'Ibirori by\'Ubukwe muri Porutugali', portugalSub: 'Torre de Dona Chama, Bragança',
    journey: 'Amakuru y\'Urugendo', journeySub: 'Turagira ibyishimo kubabona mu birori byacu',
    gallery: 'Inkuru yacu mu Mafoto',
    gifts: 'Impano z\'Urukundo n\'Serivisi',
    rsvpTitle: 'Igisubizo', rsvpDeadline: 'Nyamuneka subiza mbere ya 1 Kanama 2026',
    rsvpForm: { name: 'Amazina yombi', email: 'Imeyili', attending: 'Ni ibihe birori uzajya?',
      rwanda: 'Ubukwe muri Rwanda (Kamena 2027)', portugal: 'Ibirori muri Porutugali (Impeshyi 2027)',
      mission: 'Ndashaka kujya mu cyumweru cy\'ubutume', dietary: 'Ibyo kurya / Ibikenewe',
      prayers: 'Amasengesho Yihariye', submit: 'Ohereza Igisubizo', sending: 'Kohereza…', sent: 'Igisubizo cyakirwe! Imana ikubarinde.' },
    footer: 'Imico myinshi, ukwizera kumwe, ingabire zidashira',
    thanks: 'Murakoze cyane · Thank you · Muito obrigado · Go raibh míle maith agat',
  },
  PT: {
    lang: 'PT', flag: '🇵🇹',
    tagline: 'Em Nome do Pai, do Filho e do Espírito Santo',
    subtitle: 'Dois Corações, Duas Culturas, Um Amor em Cristo',
    invite: 'pedem humildemente a vossa presença e orações enquanto se unem no Sacramento do Santo Matrimônio em duas celebrações',
    scroll: 'Continue a jornada connosco',
    nav: { rwanda: 'Ruanda', portugal: 'Portugal', gallery: 'Galeria', rsvp: 'RSVP' },
    countdown: { days: 'Dias', hours: 'Horas', mins: 'Minutos', secs: 'Segundos', until: 'Até à Cerimónia no Ruanda' },
    rwanda: 'Santo Matrimônio', rwandaSub: 'Ruanda — Terra dos Mil Colinas',
    mission: 'Semana de Missão', missionSub: 'Antes da nossa celebração de casamento',
    portugal: 'Celebração do Casamento em Portugal', portugalSub: 'Torre de Dona Chama, Bragança',
    journey: 'Informações de Viagem', journeySub: 'Junte-se a nós nesta celebração única de amor e fé',
    gallery: 'A Nossa História em Imagens',
    gifts: 'Presentes de Amor e Serviço',
    rsvpTitle: 'RSVP', rsvpDeadline: 'Por favor, responda até 1 de Agosto de 2026',
    rsvpForm: { name: 'Nome Completo', email: 'Endereço de Email', attending: 'A que celebração(ões) irá?',
      rwanda: 'Cerimónia no Ruanda (Junho 2027)', portugal: 'Celebração em Portugal (Verão 2027)',
      mission: 'Gostaria de participar na Semana de Missão', dietary: 'Requisitos Alimentares / Necessidades',
      prayers: 'Intenções de Oração Especiais', submit: 'Enviar RSVP', sending: 'A enviar…', sent: 'RSVP Recebido! Deus vos abençoe.' },
    footer: 'Múltiplas culturas, uma fé, bênçãos infinitas',
    thanks: 'Muito obrigado · Murakoze cyane · Thank you · Go raibh míle maith agat',
  },
};

// ── CSS injected once ─────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant:ital,wght@0,300;1,300&display=swap');

  * { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes float      { 0%,100%{transform:translateY(0)}        50%{transform:translateY(-12px)} }
  @keyframes floatSlow  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
  @keyframes fadeInUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeInDown { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn    { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes petalFall  {
    0%   { transform: translateY(-60px) rotate(0deg) translateX(0);   opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(100vh) rotate(720deg) translateX(80px); opacity: 0; }
  }
  @keyframes grainMove  { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-2%,-1%)} 50%{transform:translate(1%,2%)} 75%{transform:translate(-1%,1%)} }
  @keyframes navSlideIn { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse      { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }

  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .float        { animation: float      4s ease-in-out infinite; }
  .float-slow   { animation: floatSlow  6s ease-in-out infinite; }
  .hero-title   { animation: fadeInUp   1.2s cubic-bezier(0.22,1,0.36,1) both; }
  .hero-sub     { animation: fadeInDown 1s  cubic-bezier(0.22,1,0.36,1) 0.3s both; }
  .hero-quote   { animation: scaleIn    0.9s cubic-bezier(0.22,1,0.36,1) 0.7s both; }
  .nav-animate  { animation: navSlideIn 0.4s cubic-bezier(0.22,1,0.36,1); }

  .grain-overlay {
    position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
    opacity: 0.035; animation: grainMove 0.5s steps(1) infinite;
  }

  .petal {
    position: fixed; top: -60px; pointer-events: none; z-index: 50;
    font-size: 1.2rem; animation: petalFall linear infinite;
    user-select: none;
  }

  .countdown-digit {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300; line-height: 1;
    background: linear-gradient(135deg, #9f1239, #e11d48, #fb7185);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.95); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
  }

  .nav-link {
    position: relative; letter-spacing: 0.15em; font-size: 0.8rem;
    text-transform: uppercase; font-weight: 400; transition: color 0.3s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: currentColor;
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-link:hover::after { width: 100%; }

  html { scroll-behavior: smooth; }

  .rsvp-input {
    width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem;
    border: 1px solid #e5e7eb; background: #fafafa;
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
    transition: border-color 0.3s, box-shadow 0.3s; outline: none;
  }
  .rsvp-input:focus { border-color: #fb7185; box-shadow: 0 0 0 3px rgba(251,113,133,0.15); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 2px; }

  .section-transition {
    position: relative;
  }
  .section-transition::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, visible] = useReveal();
  const t = { up: 'translateY(40px)', down: 'translateY(-40px)', left: 'translateX(-50px)', right: 'translateX(50px)', scale: 'scale(0.9)' };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t[direction], transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function ParallaxImg({ src, alt, className, strength = 0.15 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = () => { const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top + r.height / 2 - window.innerHeight / 2) * strength}px)`; };
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, [strength]);
  return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} style={{ willChange: 'transform' }} />;
}

function ZoomCard({ src, alt, className, containerClass = '', onClick }) {
  return (
    <div className={containerClass} style={{ overflow: 'hidden', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <img src={src} alt={alt} className={className} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }}
        style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
    </div>
  );
}

// ── Falling Petals ────────────────────────────────────────────────────────────
const PETALS = ['🌸', '🌹', '✨', '🌺', '💮', '🌷'];
function FallingPetals() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i, emoji: PETALS[i % PETALS.length],
    left: `${(i * 5.5) % 100}%`,
    duration: `${6 + (i % 7)}s`,
    delay: `${(i * 0.7) % 8}s`,
    size: `${0.9 + (i % 4) * 0.25}rem`,
  }));
  return (
    <>
      {petals.map(p => (
        <div key={p.id} className="petal" style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay, fontSize: p.size }}>
          {p.emoji}
        </div>
      ))}
    </>
  );
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
const WEDDING_DATE = new Date('2027-06-03T11:00:00');
function Countdown({ t }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) return;
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const units = [[time.d, t.days], [time.h, t.hours], [time.m, t.mins], [time.s, t.secs]];
  return (
    <div className="text-center">
      <p className="text-gray-500 tracking-[0.3em] uppercase text-xs mb-6">{t.until}</p>
      <div className="flex items-center justify-center space-x-2 md:space-x-6">
        {units.map(([val, label], i) => (
          <React.Fragment key={label}>
            <div className="text-center min-w-[4rem]">
              <div className="countdown-digit">{String(val).padStart(2, '0')}</div>
              <p className="text-gray-400 tracking-[0.2em] uppercase text-xs mt-2">{label}</p>
            </div>
            {i < 3 && <span className="text-rose-300 text-2xl font-thin mb-4">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNext, onPrev }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNext(); if (e.key === 'ArrowLeft') onPrev(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onNext, onPrev]);
  if (index === null) return null;
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl font-thin transition-colors z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>‹</button>
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img src={images[index].src} alt={images[index].caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
        <p className="text-white/70 text-center mt-4 tracking-widest text-sm uppercase">{images[index].caption}</p>
        <p className="text-white/40 text-center text-xs mt-2">{index + 1} / {images.length}</p>
      </div>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl font-thin transition-colors z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>›</button>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"><X className="w-8 h-8" /></button>
    </div>
  );
}

// ── RSVP Form ─────────────────────────────────────────────────────────────────
// Replace YOUR_FORM_ID below with your Formspree form ID (free at formspree.io)
const FORMSPREE_ID = 'YOUR_FORM_ID';

function RSVPForm({ t }) {
  const tf = t.rsvpForm;
  const [form, setForm] = useState({ name: '', email: '', rwanda: false, portugal: false, mission: false, dietary: '', prayers: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div className="text-center py-16 space-y-6">
      <div className="float inline-block"><CheckCircle className="w-16 h-16 text-rose-400 mx-auto" /></div>
      <p className="text-2xl text-gray-700 font-thin">{tf.sent}</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.name}</label>
          <input name="name" value={form.name} onChange={handle} required className="rsvp-input" />
        </div>
        <div>
          <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.email}</label>
          <input name="email" type="email" value={form.email} onChange={handle} required className="rsvp-input" />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-4">{tf.attending}</label>
        <div className="space-y-3">
          {[['rwanda', tf.rwanda, 'amber'], ['portugal', tf.portugal, 'blue'], ['mission', tf.mission, 'orange']].map(([key, label, color]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${form[key] ? `bg-${color}-500 border-${color}-500` : 'border-gray-300'}`}
                style={{ transition: 'all 0.2s' }}>
                {form[key] && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="checkbox" name={key} checked={form[key]} onChange={handle} className="sr-only" />
              <span className="text-gray-700 text-lg">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.dietary}</label>
        <textarea name="dietary" value={form.dietary} onChange={handle} rows={3} className="rsvp-input resize-none" />
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.prayers}</label>
        <textarea name="prayers" value={form.prayers} onChange={handle} rows={3} className="rsvp-input resize-none" />
      </div>

      <button type="submit" disabled={status === 'sending'}
        className="w-full py-4 px-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-2xl tracking-widest uppercase text-sm flex items-center justify-center space-x-3 hover:from-rose-500 hover:to-rose-700 transition-all disabled:opacity-60"
        style={{ transition: 'all 0.3s', fontFamily: 'Cormorant Garamond, serif' }}>
        {status === 'sending' ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>{tf.sending}</span></> : <><Send className="w-5 h-5" /><span>{tf.submit}</span></>}
      </button>
      {status === 'error' && <p className="text-center text-rose-600 text-sm">Something went wrong. Please email us directly.</p>}
    </form>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('EN');
  const [navVisible, setNavVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const t = T[lang];

  // Inject global styles
  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = globalStyles;
    document.head.appendChild(tag);
    document.title = 'Mary Lucy & Cormac — Wedding 2027';
    return () => document.head.removeChild(tag);
  }, []);

  // Sticky nav on scroll
  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  const nextLightbox = useCallback(() => setLightboxIdx(i => (i + 1) % galleryImages.length), []);
  const prevLightbox = useCallback(() => setLightboxIdx(i => (i - 1 + galleryImages.length) % galleryImages.length), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 font-display">

      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Falling Petals */}
      <FallingPetals />

      {/* Lightbox */}
      <Lightbox images={galleryImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNext={nextLightbox} onPrev={prevLightbox} />

      {/* ── STICKY NAV ─────────────────────────────────────────────────────── */}
      {navVisible && (
        <nav className="nav-animate fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <button onClick={() => scrollTo('hero')} className="text-gray-800 tracking-widest text-sm font-light uppercase italic">
              ML & CMH
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-8">
              {[['rwanda', t.nav.rwanda], ['portugal', t.nav.portugal], ['gallery', t.nav.gallery], ['rsvp', t.nav.rsvp]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="nav-link text-gray-600 hover:text-gray-900">{label}</button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
                {Object.values(T).map(({ lang: l, flag }) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-2 py-1 rounded-full text-xs tracking-wider transition-all ${lang === l ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>
                    {flag} {l}
                  </button>
                ))}
              </div>
              {/* Mobile menu button */}
              <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-gray-600">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 px-6 py-4 space-y-4">
              {[['rwanda', t.nav.rwanda], ['portugal', t.nav.portugal], ['gallery', t.nav.gallery], ['rsvp', t.nav.rsvp]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left text-gray-700 tracking-widest uppercase text-sm py-2 border-b border-gray-50">
                  {label}
                </button>
              ))}
            </div>
          )}
        </nav>
      )}

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <ParallaxImg src={coupleImage} alt="Couple portrait" className="w-full h-[120%] object-cover object-center -mt-[10%]" strength={0.1} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/45 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
        </div>

        {/* Floating crosses */}
        <div className="absolute top-8 right-8 opacity-10 z-10 float-slow"><Cross className="w-24 h-24 text-gray-600" /></div>
        <div className="absolute bottom-8 left-8 opacity-10 z-10 float"><Cross className="w-16 h-16 text-gray-600" /></div>

        <div className="relative z-10 px-4 py-20 text-center max-w-6xl mx-auto space-y-14">

          <div className="hero-sub flex justify-center items-center space-x-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <div className="relative float"><Heart className="w-12 h-12 text-rose-400 fill-current" /><Cross className="w-6 h-6 text-rose-300 absolute -top-2 -right-2" /></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>

          <div className="hero-sub space-y-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-rose-600 tracking-[0.5em] uppercase text-sm font-light">{t.tagline}</p>
            <div className="flex justify-center space-x-2"><Sparkles className="w-5 h-5 text-rose-300" /><Cross className="w-6 h-6 text-rose-400" /><Sparkles className="w-5 h-5 text-rose-300" /></div>
            <p className="text-gray-700 tracking-[0.3em] uppercase text-xs font-light">{t.subtitle}</p>
          </div>

          {/* Names */}
          <div className="space-y-8">
            <div className="hero-title relative" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] text-gray-800 font-thin tracking-widest leading-none italic">Mary Lucy</h1>
              <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-rose-200 rounded-full opacity-60 float" />
            </div>
            <div className="hero-sub flex items-center justify-center space-x-12 py-4" style={{ animationDelay: '0.4s' }}>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <span className="text-rose-400 text-5xl font-thin italic">&amp;</span>
              <div className="w-32 h-px bg-gradient-to-l from-transparent via-rose-300 to-transparent" />
            </div>
            <div className="hero-title relative" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] text-gray-800 font-thin tracking-widest leading-none italic">Cormac Matthew Hugh</h1>
              <div className="absolute -bottom-6 -left-6 w-10 h-10 border-2 border-rose-200 rounded-full opacity-60 float-slow" />
            </div>
          </div>

          <div className="hero-quote space-y-6 py-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed italic">{t.invite}</p>
          </div>

          {/* Countdown */}
          <div className="hero-quote bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-white/80 shadow-lg" style={{ animationDelay: '0.8s' }}>
            <Countdown t={t.countdown} />
          </div>

          <div className="hero-quote bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-xl mx-auto border border-white/80" style={{ animationDelay: '1s' }}>
            <p className="text-lg text-gray-700 italic mb-2">"What God has joined together, let no man separate."</p>
            <p className="text-sm text-gray-500">— Matthew 19:6</p>
          </div>

          <div className="pt-8 float">
            <button onClick={() => scrollTo('rwanda')} className="flex flex-col items-center space-y-3 text-gray-400 mx-auto hover:text-gray-600 transition-colors">
              <p className="text-sm tracking-widest uppercase">{t.scroll}</p>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── RWANDA ─────────────────────────────────────────────────────────── */}
      <div id="rwanda" className="section-transition relative bg-gradient-to-b from-orange-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35" style={{ overflow: 'hidden' }}>
          <ParallaxImg src={rwandaLandscape} alt="Rwanda" className="w-full h-[120%] object-cover -mt-[10%]" strength={0.12} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/50" />
        </div>

        <div className="relative z-10 py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-20">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-16 h-px bg-amber-400" />
                <div className="relative float"><Church className="w-10 h-10 text-amber-700" /><Cross className="w-5 h-5 text-amber-500 absolute -top-1 -right-1" /></div>
                <div className="w-16 h-px bg-amber-400" />
              </div>
              <h2 className="text-5xl md:text-7xl font-thin text-gray-800 mb-4 italic">{t.rwanda}</h2>
              <p className="text-amber-800 tracking-[0.4em] uppercase text-sm font-light">{t.rwandaSub}</p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-8 order-2 lg:order-1">
                <Reveal direction="left" delay={100}>
                  <ZoomCard src={rwandaLandscape} alt="Rwanda" className="w-full h-80 object-cover" containerClass="rounded-[2rem] shadow-2xl" onClick={() => setLightboxIdx(1)} />
                </Reveal>
                <Reveal direction="left" delay={250}>
                  <ZoomCard src={missionWork} alt="Mission" className="w-full h-64 object-cover" containerClass="rounded-[2rem] shadow-2xl" onClick={() => setLightboxIdx(2)} />
                </Reveal>
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <Reveal direction="right" delay={150}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/70">
                    <div className="space-y-8">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><Globe className="w-7 h-7 text-amber-800" /></div>
                        <div><p className="text-3xl text-amber-900 font-thin italic">Butare</p><p className="text-gray-500">Rwanda</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-amber-600" /><p className="text-gray-800 font-light">Thursday, June 3rd, 2027</p></div>
                        <div className="flex items-center space-x-3"><Clock className="w-5 h-5 text-amber-600" /><p className="text-gray-800 font-light">11:00 AM</p></div>
                      </div>
                      <div className="border-t border-gray-100 pt-6 flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                        <div><p className="text-gray-800 font-light">Community Chapel of the Servos de Maria de Coração de Jesus</p><p className="text-gray-400 text-sm mt-1">Huye District, Butare</p></div>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal direction="right" delay={280}>
                  <div className="bg-amber-50/80 rounded-2xl p-7">
                    <p className="text-amber-900 font-medium mb-2">Dress Code: Traditional or Formal</p>
                    <p className="text-gray-600 leading-relaxed">Experience a beautiful Catholic ceremony in the Land of a Thousand Hills. Food reception and celebration to follow at the community.</p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Mission Week */}
            <Reveal delay={150} className="mt-24">
              <div className="bg-white rounded-[2rem] p-12 shadow-2xl max-w-5xl mx-auto border border-amber-100">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-4 mb-5"><HandHeart className="w-7 h-7 text-orange-600" /><Cross className="w-5 h-5 text-orange-400 float" /><HandHeart className="w-7 h-7 text-orange-600" /></div>
                  <h3 className="text-3xl font-thin text-gray-800 italic mb-2">{t.mission}</h3>
                  <p className="text-orange-600 tracking-widest uppercase text-xs">{t.missionSub}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {[
                    { icon: GraduationCap, title: 'Teaching Children',  desc: 'Join us in sharing knowledge and hope with local children.' },
                    { icon: Stethoscope,   title: 'Visiting the Sick',   desc: "Bring comfort to hospitals, sharing God's love through compassion." },
                    { icon: HandHeart,     title: 'Helping the Poor',    desc: 'Serve those in need — food, shelter, and essential resources.' },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <Reveal key={title} delay={i * 100}>
                      <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                          <Icon className="w-7 h-7 text-orange-700" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
                        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="bg-orange-50 rounded-2xl p-8 text-center">
                  <p className="text-gray-700 leading-relaxed mb-3"><strong>28th May – 9th June 2027</strong> — Optional participation for wedding guests who feel called to this mission of mercy.</p>
                  <p className="text-orange-700 italic text-sm">"Whatever you did for one of the least of these… you did for me." — Matthew 25:40</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── TRANSITION ─────────────────────────────────────────────────────── */}
      <div className="section-transition relative py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <Reveal><div className="flex justify-center items-center space-x-6"><Star className="w-4 h-4 text-blue-400 float" /><div className="w-20 h-px bg-blue-200" /><Cross className="w-7 h-7 text-blue-500 float-slow" /><div className="w-20 h-px bg-blue-200" /><Star className="w-4 h-4 text-blue-400 float" /></div></Reveal>
          <Reveal delay={150}><h3 className="text-4xl md:text-5xl font-thin text-gray-800 italic">Then celebrate with us in Portugal</h3></Reveal>
          <Reveal delay={300}><div className="bg-white/80 rounded-2xl p-7 border border-gray-100 shadow-md max-w-sm mx-auto"><p className="text-lg text-gray-600 italic">"Love never fails"</p><p className="text-gray-400 text-sm mt-1">— 1 Corinthians 13:8</p></div></Reveal>
        </div>
      </div>

      {/* ── PORTUGAL ───────────────────────────────────────────────────────── */}
      <div id="portugal" className="section-transition relative bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40" style={{ overflow: 'hidden' }}>
          <ParallaxImg src={portugalVillage} alt="Portugal" className="w-full h-[120%] object-cover -mt-[10%]" strength={0.1} />
          <div className="absolute inset-0 bg-white/55" />
        </div>

        <div className="relative z-10 py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-20">
              <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-blue-400" /><div className="relative float"><Heart className="w-10 h-10 text-blue-500 fill-current" /><Cross className="w-4 h-4 text-blue-300 absolute -top-1 -right-1" /></div><div className="w-16 h-px bg-blue-400" /></div>
              <h2 className="text-5xl md:text-7xl font-thin text-gray-800 mb-4 italic">{t.portugal}</h2>
              <p className="text-blue-700 tracking-[0.4em] uppercase text-sm font-light">{t.portugalSub}</p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <Reveal direction="left" delay={100}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/70">
                    <div className="space-y-8">
                      <div className="flex items-center space-x-6"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center"><Globe className="w-7 h-7 text-blue-700" /></div><div><p className="text-3xl text-blue-800 font-thin italic">Torre de Dona Chama</p><p className="text-gray-500">Bragança, Portugal</p></div></div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-blue-500" /><p className="text-gray-800 font-light">Summer 2027</p></div>
                        <div className="flex items-center space-x-3"><Clock className="w-5 h-5 text-blue-500" /><p className="text-gray-800 font-light">Time TBA</p></div>
                      </div>
                      <div className="border-t border-gray-100 pt-6 flex items-start space-x-3"><MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" /><p className="text-gray-700 font-light">Torre de Dona Chama, Bragança</p></div>
                    </div>
                  </div>
                </Reveal>
                <Reveal direction="left" delay={250}>
                  <div className="bg-blue-50/80 rounded-2xl p-7">
                    <p className="text-blue-900 font-medium mb-2">Dress Code: Elegant</p>
                    <p className="text-gray-600 leading-relaxed">A festive reception with traditional Portuguese cuisine, music, and dancing to honour our holy matrimony.</p>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="right" delay={200}>
                <div className="relative">
                  <ZoomCard src={portugalVillage} alt="Portugal" className="w-full h-[28rem] object-cover" containerClass="rounded-[2rem] shadow-2xl" onClick={() => setLightboxIdx(3)} />
                  <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-blue-100 rounded-full opacity-60 float" />
                  <div className="absolute -top-8 -left-8 w-18 h-18 border-2 border-blue-200 rounded-full opacity-70 float-slow" style={{ width: '4.5rem', height: '4.5rem' }} />
                  <div className="absolute top-4 right-4 opacity-50 float"><Cross className="w-7 h-7 text-white" /></div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ── JOURNEY ────────────────────────────────────────────────────────── */}
      <div className="section-transition relative py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-gray-300" /><Users className="w-8 h-8 text-gray-600" /><div className="w-16 h-px bg-gray-300" /></div>
            <h2 className="text-5xl font-thin text-gray-800 italic mb-4">{t.journey}</h2>
            <p className="text-gray-500 text-lg font-light">{t.journeySub}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { color: 'amber', title: 'Rwanda', items: [['Airport', 'Kigali International Airport'], ['Dates', '28th May – 9th June 2027'], ['RSVP', 'By 1st August 2026 — guests added to WhatsApp group for coordination.']], note: 'Experience the warmth of Rwandan hospitality' },
              { color: 'blue',  title: 'Portugal', items: [['Airport', 'Porto Airport'], ['Dates', 'TBC — Summer 2027'], ['RSVP', 'By 1st August 2026 — guests added to WhatsApp group for coordination.']], note: 'Experience the beauty of Northern Portuguese culture' },
            ].map(({ color, title, items, note }, i) => (
              <Reveal key={title} direction={i === 0 ? 'left' : 'right'} delay={i * 150}>
                <div className="bg-white rounded-[2rem] p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                  style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-${color}-50 rounded-full -translate-y-20 translate-x-20`} />
                  <div className="relative z-10">
                    <h3 className={`text-3xl font-thin text-${color}-900 italic mb-8`}>{title}</h3>
                    <div className="space-y-6 text-gray-600">
                      {items.map(([label, value]) => (
                        <div key={label} className="flex items-start space-x-4">
                          <div className={`w-2 h-2 bg-${color}-400 rounded-full mt-2 shrink-0`} />
                          <div><p className="font-medium text-gray-800">{label}</p><p className="text-gray-500">{value}</p></div>
                        </div>
                      ))}
                    </div>
                    <div className={`bg-${color}-50 rounded-xl p-5 mt-8`}>
                      <p className={`text-${color}-700 italic`}>{note}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── GALLERY ────────────────────────────────────────────────────────── */}
      <div id="gallery" className="section-transition py-32 px-4 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-rose-300" /><Camera className="w-8 h-8 text-rose-500 float" /><div className="w-16 h-px bg-rose-300" /></div>
            <h2 className="text-5xl font-thin text-gray-800 italic mb-4">{t.gallery}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} direction="scale">
                <ZoomCard
                  src={img.src} alt={img.caption}
                  className="w-full h-48 md:h-64 object-cover"
                  containerClass={`rounded-2xl shadow-lg ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
                  onClick={() => setLightboxIdx(i)}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-center text-gray-400 text-sm tracking-widest uppercase mt-8">Click any image to explore</p>
          </Reveal>
        </div>
      </div>

      {/* ── GIFTS ──────────────────────────────────────────────────────────── */}
      <div className="section-transition py-32 px-4 bg-gradient-to-b from-rose-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <Reveal><div className="flex items-center justify-center space-x-6"><div className="w-16 h-px bg-rose-300" /><div className="relative float"><Heart className="w-10 h-10 text-rose-500" /><Cross className="w-5 h-5 text-rose-300 absolute -top-1 -right-1" /></div><div className="w-16 h-px bg-rose-300" /></div></Reveal>
          <Reveal delay={100}><h3 className="text-4xl font-thin text-gray-800 italic">{t.gifts}</h3></Reveal>
          <Reveal delay={200}>
            <div className="bg-white rounded-3xl p-14 shadow-2xl border border-rose-100">
              <HandHeart className="w-12 h-12 text-rose-400 mx-auto mb-8 float" />
              <p className="text-gray-600 leading-relaxed text-xl mb-10 italic">Your presence at our celebrations is the greatest blessing we could receive. If you wish to honour our union with a gift, we humbly request offerings towards our new home together.</p>
              <div className="bg-rose-50 rounded-2xl p-10 mb-8">
                <h4 className="text-xl text-rose-700 mb-6 font-light tracking-widest uppercase text-sm">Your Gift Will Support</h4>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[{ icon: House, title: 'Our New Home', desc: 'Furniture, fittings, decoration' }, { icon: Stethoscope, title: 'Project Indabo', desc: 'Rwandan children — food, clothes, shelter' }, { icon: HandHeart, title: 'Celebrations', desc: 'Catering and decoration' }].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start space-x-3" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                      <Icon className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                      <div><p className="font-medium text-rose-800">{title}</p><p className="text-gray-500 text-sm">{desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-rose-600 italic">"It is more blessed to give than to receive" — Acts 20:35</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── RSVP ───────────────────────────────────────────────────────────── */}
      <div id="rsvp" className="section-transition py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-gray-400" /><Flower2 className="w-8 h-8 text-gray-600 float-slow" /><Cross className="w-7 h-7 text-gray-500 float" /><div className="w-16 h-px bg-gray-400" /></div>
            <h2 className="text-5xl font-thin text-gray-800 italic mb-4">{t.rsvpTitle}</h2>
            <p className="text-gray-500 tracking-widest uppercase text-sm">{t.rsvpDeadline}</p>
          </Reveal>

          {/* Contact cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { color: 'amber', title: 'Portuguese & all other guests', email: 'alvesmary98@gmail.com', phone: '+44 7729 361640' },
              { color: 'blue',  title: 'Irish & all other guests',       email: 'comckennaa@gmail.com', phone: '+353 851094610' },
            ].map(({ color, title, email, phone }, i) => (
              <Reveal key={title} direction={i === 0 ? 'left' : 'right'} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
                  style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <h4 className={`text-xl font-thin text-${color}-800 italic mb-4`}>{title}</h4>
                  <p className="text-gray-600">{email}</p>
                  <p className="text-gray-600 mt-1">{phone}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RSVP Form */}
          <Reveal delay={200}>
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-thin text-gray-700 italic text-center mb-8">Or fill in the form below</h3>
              <RSVPForm t={t} />
              {FORMSPREE_ID === 'YOUR_FORM_ID' && (
                <p className="text-center text-gray-400 text-xs mt-4 italic">
                  To enable the form: create a free account at formspree.io, get your form ID, and replace YOUR_FORM_ID at the top of App.jsx
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div className="section-transition py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <Reveal>
            <div className="flex justify-center items-center space-x-6">
              <div className="w-3 h-3 bg-amber-300 rounded-full float" />
              <Cross className="w-7 h-7 text-rose-400 float-slow" />
              <div className="w-4 h-4 bg-rose-400 rounded-full float" />
              <Cross className="w-7 h-7 text-rose-400 float-slow" />
              <div className="w-3 h-3 bg-blue-300 rounded-full float" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-3xl text-gray-700 font-thin italic">"{t.footer}"</p>
            <p className="text-gray-400 mt-4 tracking-wide">{t.thanks}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="bg-rose-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-rose-700 italic leading-relaxed">"The Lord bless you and keep you. The Lord shine his face upon you and be gracious to you. The Lord look upon you kindly and give you peace."</p>
              <p className="text-gray-400 text-sm mt-3">— Numbers 6:24–26</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-gray-400 text-sm">We are blessed to share these sacred moments with you!</p>
            <div className="flex justify-center space-x-3 mt-6">
              <div className="w-px h-10 bg-gradient-to-b from-rose-300 to-transparent" />
              <Cross className="w-6 h-6 text-rose-400 float" />
              <div className="w-px h-10 bg-gradient-to-b from-rose-300 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>

    </div>
  );
}

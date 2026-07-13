import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Target,
  CheckCircle2,
  TrendingUp,
  Users,
  Heart,
  Menu,
  X,
  Quote,
  Mail,
  Phone,
  Palette,
  Camera,
  Video,
  Megaphone,
  MousePointerClick,
  Code,
  Search,
  PenTool,
  Coffee,
  Sparkles,
  Stethoscope,
  ShoppingBag,
  Building2,
  Dumbbell
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Intro from './Intro.jsx';
import ceoPhoto from './assets/ceo-photo.jpeg';
import mainLogo from './assets/logo.png';
import './App.css';

const EASE = [0.22, 1, 0.36, 1];
// Softer, gentler curve for scroll reveals — eases in and out for a calm glide.
const EASE_SMOOTH = [0.25, 0.4, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_SMOOTH } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } }
};

// Trigger a bit earlier so sections ease in before they're fully in view.
const viewportOnce = { once: true, margin: '-120px' };

const NAV_LINKS = [
  { href: '#sherbimet', label: 'Shërbimet' },
  { href: '#bizneset', label: 'Bizneset' },
  { href: '#pse-ne', label: 'Pse Ne' },
  { href: '#procesi', label: 'Procesi' }
];

// >>> ZËVENDËSO me llojet dhe bizneset reale që ke ndihmuar.
const BIZNES_KATEGORITE = [
  {
    key: 'estetike',
    label: 'Estetikë & Bukuri',
    icon: <Sparkles size={18} />,
    biznese: [
      { id: 'lunea', emri: 'LUNÉA', logo: '/lunea.png' }
    ]
  },
  {
    key: 'shendetesi',
    label: 'Shëndetësi',
    icon: <Stethoscope size={18} />,
    biznese: []
  },
  {
    key: 'retail',
    label: 'Retail & Dyqane',
    icon: <ShoppingBag size={18} />,
    biznese: [
      { id: 'dolce-casa', emri: 'Dolce Casa', logo: '/dolce-casa.png' }
    ]
  },
  {
    key: 'ndertim',
    label: 'Ndërtim & Pasuri',
    icon: <Building2 size={18} />,
    biznese: [
      { id: 'hidros', emri: 'Hidros', logo: '/hidros.png' }
    ]
  },
  {
    key: 'fitness',
    label: 'Fitness & Sport',
    icon: <Dumbbell size={18} />,
    biznese: []
  }
];

// >>> ZËVENDËSO me numrin real të WhatsApp të biznesit,
//     format ndërkombëtar pa "+" (p.sh. 355691234567)
const WHATSAPP_NUMER = '355688007990';

// >>> ZËVENDËSO me profilet reale të biznesit
const INSTAGRAM_URL = 'https://instagram.com/amaimarketing';
const TIKTOK_URL = 'https://tiktok.com/@amaimarketing';

const SHERBIMET = [
  'Menaxhim i Rrjeteve Sociale',
  'Branding & Identitet Vizual',
  'Krijim Përmbajtjeje',
  'Xhirim Spotesh & Reklamash',
  'Meta Ads',
  'Google Ads',
  'Zhvillim Website',
  'SEO',
  'Strategji Marketingu',
  'Dizajn Grafik'
];

function WhatsappIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TiktokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function AvatarDuotone({ src, alt }) {
  return (
    <span className="avatar-duotone">
      <img src={src} alt={alt} loading="lazy" />
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="logo" onClick={() => setMenuOpen(false)}>
          <img src={mainLogo} alt="Amai Marketing Logo" style={{ height: '55px', objectFit: 'contain' }} />
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '10px 20px', backgroundColor: 'var(--white)', color: 'var(--red-900)' }}>
            Konsultë Falas
          </a>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(open => !open)}
          aria-label={menuOpen ? 'Mbyll menunë' : 'Hap menunë'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#kontakt" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ backgroundColor: 'var(--white)', color: 'var(--red-900)' }}>
              Konsultë Falas
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
      </div>
      <div className="container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="social-proof-badge">
            <span className="social-proof-avatars">
              <AvatarDuotone src="https://i.pravatar.cc/100?img=1" alt="Klient" />
              <AvatarDuotone src="https://i.pravatar.cc/100?img=2" alt="Klient" />
              <AvatarDuotone src="https://i.pravatar.cc/100?img=3" alt="Klient" />
            </span>
            <span>20+ biznese të ndihmuara këtë vit</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Kthe klikimet në <span className="hero-highlight">klientë besnikë</span> për biznesin tënd.
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtitle">
            Ne jemi partneri juaj strategjik për marketing dixhital. Ndërtojmë sisteme, menaxhojmë rrjete sociale dhe rrisim shitjet tuaja online me garanci.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href={`https://wa.me/${WHATSAPP_NUMER}?text=${encodeURIComponent("Përshëndetje! Dua të rezervoj një konsultë falas për biznesin tim.")}`} className="btn btn-primary btn-hero" target="_blank" rel="noopener noreferrer">
              <span className="btn-shine"></span>
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                Merr Konsultë Falas <ArrowRight size={20} />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



function Bizneset() {
  const [aktive, setAktive] = useState(BIZNES_KATEGORITE[0].key);
  const kategoria = BIZNES_KATEGORITE.find(k => k.key === aktive);

  const panelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateX: -50, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 220, damping: 16 }
    }
  };

  return (
    <section id="bizneset" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="section-title">Bizneset që Ndihmojmë</h2>
          <p className="section-subtitle">Zgjidh një lloj biznesi për të parë disa nga klientët tanë në atë fushë.</p>
        </motion.div>

        <motion.div
          className="biz-tabs"
          role="tablist"
          aria-label="Llojet e bizneseve"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {BIZNES_KATEGORITE.map(kat => {
            const zgjedhur = kat.key === aktive;
            return (
              <button
                key={kat.key}
                type="button"
                role="tab"
                aria-selected={zgjedhur}
                aria-controls={`biz-panel-${kat.key}`}
                className={`biz-tab${zgjedhur ? ' is-active' : ''}`}
                onClick={() => setAktive(kat.key)}
              >
                <span className="biz-tab-icon">{kat.icon}</span>
                {kat.label}
                <span className="biz-tab-count">{kat.biznese.length}</span>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={kategoria.key}
            id={`biz-panel-${kategoria.key}`}
            role="tabpanel"
            className="biz-grid"
            style={{ perspective: 1200 }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {kategoria.biznese.map(biz => (
              <motion.div key={biz.id || biz.emri || biz.name} className="biz-card" variants={cardVariants} style={{ transformOrigin: 'top center' }}>
                {biz.logo ? (
                  <img src={biz.logo} alt={biz.emri} style={{ height: '70px', objectFit: 'contain' }} />
                ) : (
                  <span className="biz-mark" aria-hidden="true">{(biz.emri || biz.name)?.charAt(0)}</span>
                )}
                <div>
                  <h3 className="biz-name">{biz.emri || biz.name}</h3>
                  {(biz.tag || biz.pershkrimi) && <p className="biz-tag">{biz.tag || biz.pershkrimi}</p>}
                </div>
              </motion.div>
            ))}
            {kategoria.biznese.length === 0 && (
              <motion.div 
                style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Së shpejti do të shtohen projektet për këtë kategori.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Sa gradë rrotullohet karta në skajet e saj.
const TILT_MAX_DEG = 11;
const TILT_SPRING = { stiffness: 220, damping: 26, mass: 0.6 };

function ServiceCard({ service }) {
  const reduceMotion = useReducedMotion();

  // 0..1 pozicioni i kursorit brenda kartës; 0.5/0.5 = qendra (pa rrotullim).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [TILT_MAX_DEG, -TILT_MAX_DEG]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT_MAX_DEG, TILT_MAX_DEG]), TILT_SPRING);

  const glareX = useTransform(px, v => `${v * 100}%`);
  const glareY = useTransform(py, v => `${v * 100}%`);
  // Karta është e bardhë — një shkëlqim i bardhë do të ishte i padukshëm, prandaj përdorim të kuqen e brendit.
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(193, 18, 31, 0.09), rgba(193, 18, 31, 0) 58%)`;

  const recenter = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const handlePointerMove = (event) => {
    // Prekja rrëshqet karuselin horizontalisht — mos e pengo me tilt.
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div variants={fadeUp} className="service-card-scene">
      <motion.article
        className="service-card"
        style={{ rotateX, rotateY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={recenter}
        onBlur={recenter}
      >
        <motion.span className="service-card-glare" style={{ backgroundImage: glare }} aria-hidden="true" />
        <div className="service-icon">{service.icon}</div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.desc}</p>
      </motion.article>
    </motion.div>
  );
}

function Services() {
  const services = [
    {
      icon: <Smartphone size={28} />,
      title: 'Menaxhim i Rrjeteve Sociale',
      desc: 'Krijojmë përmbajtje që angazhon dhe kthen ndjekësit në klientë përmes strategjive të personalizuara në Instagram, Facebook, TikTok dhe LinkedIn.'
    },
    {
      icon: <Palette size={28} />,
      title: 'Branding & Identitet Vizual',
      desc: 'Ndërtojmë identitete unike që e bëjnë markën të dallohet dhe të krijojë një imazh profesional e të qëndrueshëm.'
    },
    {
      icon: <Camera size={28} />,
      title: 'Krijim Përmbajtjeje',
      desc: 'Realizojmë foto, Reels dhe materiale kreative që tregojnë historinë e markës dhe rrisin angazhimin.'
    },
    {
      icon: <Video size={28} />,
      title: 'Xhirim Spotesh & Reklamash',
      desc: 'Produkojmë reklama profesionale, video promocionale dhe spote kreative që prezantojnë markën me cilësi të lartë në çdo platformë.'
    },
    {
      icon: <Megaphone size={28} />,
      title: 'Meta Ads',
      desc: 'Menaxhojmë fushata reklamuese në Facebook dhe Instagram për të gjeneruar më shumë klientë, shitje dhe rezultate të matshme.'
    },
    {
      icon: <MousePointerClick size={28} />,
      title: 'Google Ads',
      desc: 'Vendosim biznesin tënd përpara klientëve në momentin që ata kërkojnë produktet ose shërbimet që ofron.'
    },
    {
      icon: <Code size={28} />,
      title: 'Zhvillim Website',
      desc: 'Krijojmë faqe interneti moderne, të shpejta dhe të optimizuara për një eksperiencë të shkëlqyer dhe konvertime më të larta.'
    },
    {
      icon: <Search size={28} />,
      title: 'SEO',
      desc: 'Optimizojmë faqen tënde për motorët e kërkimit që biznesi yt të renditet më lart dhe të tërheqë më shumë trafik organik.'
    },
    {
      icon: <Target size={28} />,
      title: 'Strategji Marketingu',
      desc: 'Analizojmë tregun dhe ndërtojmë strategji të personalizuara që ndihmojnë markën të rritet në mënyrë të qëndrueshme.'
    },
    {
      icon: <PenTool size={28} />,
      title: 'Dizajn Grafik',
      desc: 'Krijojmë materiale vizuale premium për rrjete sociale, reklama, print dhe çdo pikë kontakti me klientin, duke ruajtur një identitet të unifikuar.'
    }
  ];

  return (
    <section id="sherbimet" className="section section-tint">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="section-title">Si mund t'ju ndihmojmë?</h2>
          <p className="section-subtitle">Gjithçka që i duhet biznesit tënd për të dominuar tregun dixhital, në një vend të vetëm.</p>
        </motion.div>

        <motion.div
          className="services-carousel"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {services.map(service => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Shtyllat e grafikut të rritjes (lartësi në %). Muaji i fundit = kulmi.
const RRITJA_BARS = [34, 48, 43, 61, 74, 92];

function MarketingVisual3D() {
  const reduceMotion = useReducedMotion();

  // 0..1 pozicioni i kursorit; 0.5/0.5 = qendra, ku skena rri në këndin bazë 3D.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Këndi bazë isometrik + lëvizje sipas kursorit.
  const rotateY = useSpring(useTransform(px, [0, 1], [-26, -2]), TILT_SPRING);
  const rotateX = useSpring(useTransform(py, [0, 1], [18, -2]), TILT_SPRING);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const recenter = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const float = (delay) =>
    reduceMotion
      ? {}
      : { animate: { y: [0, -12, 0] }, transition: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay } };

  return (
    <motion.div
      className="mv-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={recenter}
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: EASE_SMOOTH }}
    >
      <motion.div className="mv-card" style={{ rotateX, rotateY }}>
        <div className="mv-card-glow" aria-hidden="true" />

        <div className="mv-card-head">
          <div>
            <span className="mv-card-label">Rritje mujore</span>
            <strong className="mv-card-value">+240%</strong>
          </div>
          <span className="mv-card-trend"><TrendingUp size={16} /> ROI 3.8x</span>
        </div>

        <div className="mv-bars">
          {RRITJA_BARS.map((h, i) => (
            <motion.span
              key={i}
              className={`mv-bar${i === RRITJA_BARS.length - 1 ? ' is-peak' : ''}`}
              initial={{ height: '8%' }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 * i }}
            />
          ))}
        </div>

        <div className="mv-axis">
          <span>Jan</span><span>Shk</span><span>Mar</span><span>Pri</span><span>Maj</span><span>Qer</span>
        </div>

        <motion.div className="mv-chip mv-chip--like" style={{ translateZ: 95 }} {...float(0)}>
          <Heart size={15} /> +1.2k
        </motion.div>
        <motion.div className="mv-chip mv-chip--follow" style={{ translateZ: 70 }} {...float(1.1)}>
          <Users size={15} /> +854 ndjekës
        </motion.div>
        <motion.div className="mv-chip mv-chip--sale" style={{ translateZ: 82 }} {...float(0.6)}>
          <TrendingUp size={15} /> 128 shitje
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function WhyUs() {
  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: "Fokus te Rezultati, Jo Vetëm te 'Like'",
      desc: 'Ne matim suksesin përmes rritjes së shitjeve tuaja dhe ROI-t, jo vetëm metrikave boshe.'
    },
    {
      icon: <Users size={24} />,
      title: 'Ekip i Dedikuar Ekspertësh',
      desc: 'Nuk jemi thjesht një agjenci, por një zgjatim i ekipit tuaj të brendshëm që kujdeset për rritjen tuaj.'
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: 'Transparencë e Plotë',
      desc: 'Raporte javore të qarta ku shihni saktësisht ku po shkon buxheti juaj dhe çfarë po kthehet.'
    }
  ];

  return (
    <section id="pse-ne" className="section section-light">
      <div className="container">
        <div className="why-us-grid">
          <MarketingVisual3D />

          <motion.div
            className="why-us-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="section-title" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>
              Pse jemi partneri i duhur për ju?
            </motion.h2>

            <div className="why-us-features">
              {features.map(feature => (
                <motion.div key={feature.title} variants={fadeUp} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div>
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="service-desc">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function Process() {
  const steps = [
    { title: 'Zbulim', desc: 'Analizojmë biznesin, tregun dhe sfidat tuaja aktuale përmes një konsulte falas.' },
    { title: 'Strategji', desc: 'Ndërtojmë një plan të personalizuar veprimi që përshtatet me buxhetin dhe qëllimet tuaja.' },
    { title: 'Ekzekutim', desc: 'Ekipi ynë merr përsipër zhvillimin e web-it, menaxhimin e rrjeteve dhe krijimin e fushatave.' },
    { title: 'Rezultat', desc: 'Optimojmë vazhdimisht për të rritur konvertimet dhe dorëzojmë raporte të detajuara.' }
  ];

  return (
    <section id="procesi" className="section section-light">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="section-title">Si Funksionon</h2>
          <p className="section-subtitle">Një proces i thjeshtë, pa stres dhe i orientuar drejt rezultateve të matshme.</p>
        </motion.div>

        <motion.div
          className="process-steps"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={fadeUp} className="process-step">
              <div className="step-number">{index + 1}</div>
              <h4 className="feature-title">{step.title}</h4>
              <p className="service-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);

  const testimonials = [
    {
      text: "Nuk mendoja kurrë që rrjetet sociale mund të sillnin kaq shumë shitje reale. Amai Marketing jo vetëm na rriti ndjekësit, por na solli klientë që blejnë. ROI i fushatave ka qenë i jashtëzakonshëm.",
      author: 'Arben Hoxha',
      role: 'Pronar, Hidros Albania',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      text: "Kemi provuar disa agjenci më parë, por Amai bëri diferencën me përkushtimin dhe transparencën. Çdo muaj kemi raportim të detajuar dhe strategji të reja që i përshtaten tregut tonë.",
      author: 'Enisa Mehmeti',
      role: 'Menaxhere, Dolce Casa',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      text: "Faqja e re që na ndërtuan është e jashtëzakonshme! Funksionon shpejt dhe ka dyfishuar numrin e rezervimeve që marrim online krahasuar me faqen e vjetër.",
      author: 'Erald Duka',
      role: 'Drejtor, LUNÉA Estetikë',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      text: "Kreativiteti në xhirimet e videove dhe fotove ka bërë që brandi ynë të duket shumë premium. Komunikimi është gjithmonë i shpejtë dhe efikas.",
      author: 'Bora Leka',
      role: 'Themeluese, Studio Lumo',
      avatar: 'https://i.pravatar.cc/150?img=9'
    }
  ];

  const imageIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const current = testimonials[imageIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="section section-drench" style={{ overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="section-title">Çfarë thonë klientët tanë</h2>
        </motion.div>

        <div className="testimonials-slideshow" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  x: direction > 0 ? 800 : -800,
                  opacity: 0,
                  scale: 0.95
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: 1
                },
                exit: (direction) => ({
                  zIndex: 0,
                  x: direction < 0 ? 800 : -800,
                  opacity: 0,
                  scale: 0.95
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="testimonial-card"
              style={{ position: 'absolute', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'grab', background: 'var(--bg-white)', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', color: '#FBBF24' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="testimonial-text" style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '32px', maxWidth: '650px', lineHeight: 1.7, color: 'var(--text-main)' }}>"{current.text}"</p>
              <div className="testimonial-author" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AvatarDuotone src={current.avatar} alt={current.author} />
                <div style={{ textAlign: 'left', marginLeft: '16px' }}>
                  <div className="author-name" style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>{current.author}</div>
                  <div className="author-role" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
          
        <div className="slideshow-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '48px', position: 'relative', zIndex: 10 }}>
          <button onClick={() => paginate(-1)} style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="slideshow-dots" style={{ display: 'flex', gap: '10px' }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const newDirection = idx > imageIndex ? 1 : -1;
                  setPage([page + (idx - imageIndex), newDirection]);
                }}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: imageIndex === idx ? 'var(--red-900)' : 'var(--red-200)',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                aria-label={`Shko te dëshmia ${idx + 1}`}
              />
            ))}
          </div>
          <button onClick={() => paginate(1)} style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="themeluesi" className="section section-light">
      <div className="container">
        <div className="founder-grid">
          <motion.div
            className="founder-portrait"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          >
            <div className="duotone">
              <img
                src={ceoPhoto}
                alt="Portret i themeluesit të AMAI Marketing"
                loading="lazy"
              />
            </div>
            <div className="founder-badge">CEO</div>
          </motion.div>

          <motion.div
            className="founder-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="founder-eyebrow">CEO</motion.p>

            <motion.blockquote variants={fadeUp} className="founder-quote">
              E ndërtova AMAI me një bindje të thjeshtë: çdo biznes meriton të dallohet, të frymëzojë besim dhe të rritet përmes <span>marketingut të duhur</span>.
            </motion.blockquote>

            <motion.p variants={fadeUp} className="founder-text">
              Besoj se marketingu nuk ka të bëjë vetëm me postime të bukura apo reklama. Ka të bëjë me ndërtimin e një identiteti që njerëzit e kujtojnë, me krijimin e besimit dhe me kthimin e vizitorëve në klientë besnikë.
            </motion.p>

            <motion.p variants={fadeUp} className="founder-text">
              Sot, çdo projekt trajtohet me të njëjtin përkushtim sikur të ishte biznesi ynë. Punojmë afër klientëve tanë, kuptojmë objektivat e tyre dhe krijojmë zgjidhje që kanë ndikim real në rritjen e biznesit.
            </motion.p>

            <motion.div variants={fadeUp} className="founder-sign">
              <div>
                <div className="founder-name">Egi Kormaku</div>
                <div className="founder-role">CEO, AMAI Marketing</div>
              </div>
              <div className="founder-stats">
                <div>
                  <div className="founder-stat-value">20+</div>
                  <div className="founder-stat-label">Biznese</div>
                </div>
                <div>
                  <div className="founder-stat-value">4+</div>
                  <div className="founder-stat-label">Vite përvojë</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function formatoData(data, ora) {
  if (!data) return '';
  const [vit, muaj, dite] = data.split('-').map(Number);
  const d = new Date(vit, muaj - 1, dite);
  let tekst = d.toLocaleDateString('sq-AL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  if (ora) tekst += `, ora ${ora}`;
  return tekst;
}

// Ndërton rreshtat e mesazhit të WhatsApp. Në modalitetin `preview` përdor
// tekste vend-mbajtëse për fushat e zbrazëta, që parapamja të mos jetë kurrë bosh.
function buildRreshtat(values, { preview = false } = {}) {
  const emri = values.emri.trim();
  const sherbimi = values.sherbimi;
  const dataFormatuar = formatoData(values.data, values.ora);
  const mesazhi = values.mesazhi.trim();

  const rreshtat = [
    'Përshëndetje! Dua të rezervoj një konsultë.',
    `• Emri: ${emri || (preview ? '…' : '')}`,
    `• Shërbimi: ${sherbimi || (preview ? '…' : '')}`
  ];
  if (dataFormatuar) rreshtat.push(`• Data: ${dataFormatuar}`);
  if (mesazhi) rreshtat.push(`• Mesazhi: ${mesazhi}`);
  return rreshtat;
}

function Rezervime() {
  const [values, setValues] = useState({ emri: '', sherbimi: '', data: '', ora: '', mesazhi: '' });
  const [errors, setErrors] = useState({ emri: false, sherbimi: false });

  const update = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  // Parapamje "live" — përditësohet në kohë reale ndërsa plotësohet forma.
  const previewLines = useMemo(() => buildRreshtat(values, { preview: true }), [values]);
  const koha = useMemo(
    () => new Date().toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const emri = values.emri.trim();
    const sherbimi = values.sherbimi;

    const nextErrors = { emri: !emri, sherbimi: !sherbimi };
    setErrors(nextErrors);
    if (nextErrors.emri || nextErrors.sherbimi) return;

    const rreshtat = buildRreshtat(values);
    const url = `https://wa.me/${WHATSAPP_NUMER}?text=${encodeURIComponent(rreshtat.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <section id="kontakt" className="section section-tint">
      <div className="container">
        <div className="rezervime-grid">
          <motion.div
            className="rezervime-intro"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="founder-eyebrow">Rezervime</motion.p>
            <motion.h2 variants={fadeUp} className="section-title" style={{ textAlign: 'left', marginBottom: '18px' }}>
              Rezervo konsultën tënde <span style={{ color: 'var(--red-900)' }}>falas</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="rezervime-lead">
              Plotëso formën dhe dërgoje direkt në WhatsApp. Të përgjigjemi po atë ditë me hapat konkretë për biznesin tënd.
            </motion.p>

            <motion.ul variants={fadeUp} className="rezervime-perks">
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Konsultë 30-minutëshe pa asnjë kosto</li>
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Përgjigje po atë ditë, jo pas javësh</li>
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Plan konkret veprimi, jo premtime boshe</li>
            </motion.ul>
          </motion.div>

          <motion.form
            className="rezervime-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <div className="rz-field">
              <label className="rz-label" htmlFor="emri">Emri i plotë</label>
              <input
                id="emri"
                type="text"
                className={`rz-control ${errors.emri ? 'is-error' : ''}`}
                placeholder="P.sh. Arben Hoxha"
                value={values.emri}
                onChange={update('emri')}
                autoComplete="name"
              />
              {errors.emri && <span className="rz-error">Ju lutem shkruani emrin tuaj.</span>}
            </div>

            <div className="rz-field">
              <label className="rz-label" htmlFor="sherbimi">Shërbimi i interesuar</label>
              <select
                id="sherbimi"
                className={`rz-control rz-select ${errors.sherbimi ? 'is-error' : ''} ${!values.sherbimi ? 'is-placeholder' : ''}`}
                value={values.sherbimi}
                onChange={update('sherbimi')}
              >
                <option value="" disabled>Zgjidh një shërbim</option>
                {SHERBIMET.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.sherbimi && <span className="rz-error">Ju lutem zgjidhni një shërbim.</span>}
            </div>

            <div className="rz-field">
              <label className="rz-label" htmlFor="data">Data e preferuar <span className="rz-opt">(opsionale)</span></label>
              <div className="rz-row">
                <input id="data" type="date" className="rz-control" value={values.data} onChange={update('data')} />
                <input id="ora" type="time" className="rz-control" value={values.ora} onChange={update('ora')} aria-label="Ora e preferuar" />
              </div>
            </div>

            <div className="rz-field">
              <label className="rz-label" htmlFor="mesazhi">Mesazh shtesë <span className="rz-opt">(opsional)</span></label>
              <textarea
                id="mesazhi"
                className="rz-control rz-textarea"
                placeholder="Trego shkurt për biznesin ose sfidën tënde..."
                value={values.mesazhi}
                onChange={update('mesazhi')}
              />
            </div>

            <button type="submit" className="btn-whatsapp">
              <WhatsappIcon size={22} /> Rezervo në WhatsApp
            </button>
            <p className="rz-note">S'ka nevojë të krijosh llogari — hapet direkt biseda.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const marqueeGroup = (hidden) => (
    <div className="footer-marquee-group" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="footer-marquee-item">
          AMAI Marketing<span className="dot">.</span>
        </span>
      ))}
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          {marqueeGroup(false)}
          {marqueeGroup(true)}
        </div>
      </div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="logo" style={{ marginBottom: '16px' }}>
              <img src={mainLogo} alt="Amai Marketing Logo" style={{ height: '55px', objectFit: 'contain' }} />
            </h2>
            <p className="footer-desc">
              Ndërtojmë marka që dallohen, krijojmë strategji që funksionojnë dhe zhvillojmë eksperienca dixhitale që sjellin rezultate reale
            </p>
            <div className="social-links">
              <a
                href={INSTAGRAM_URL}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={TIKTOK_URL}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <TiktokIcon size={20} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMER}`}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Lidhje të Shpejta</h4>
            <div className="footer-links">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="footer-link">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-title">Na Kontaktoni</h4>
            <div className="footer-links">
              <a href="mailto:amaimarketinggroup@gmail.com" className="footer-link">
                <Mail size={16} /> amaimarketinggroup@gmail.com
              </a>
              <a href="tel:+355688007990" className="footer-link">
                <Phone size={16} /> +355 68 800 7990
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
            <p>&copy; {new Date().getFullYear()} Amai Marketing. Të gjitha të drejtat e rezervuara.</p>
            <div className="social-links">
              <a href="#" className="social-link" style={{ fontSize: '0.875rem' }}>Kushtet e Përdorimit</a>
              <a href="#" className="social-link" style={{ fontSize: '0.875rem' }}>Privatësia</a>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>powered by neolink</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // Longer glide + gentle exponential ease-out for a calm, chill scroll.
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Slightly lighter wheel so scrolling feels soft rather than jumpy.
      wheelMultiplier: 0.9,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    // Mbaje faqen në krye dhe ndalo scroll-in derisa intro-ja të mbarojë.
    if (!introDone) {
      window.scrollTo(0, 0);
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [introDone]);

  return (
    <MotionConfig reducedMotion="user">
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <Hero />
        <Services />
        <Bizneset />
        <WhyUs />
        <Process />
        <Testimonials />
        <Founder />
        <Rezervime />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;

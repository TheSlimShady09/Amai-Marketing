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
  BarChart3,
  Smartphone,
  Zap,
  Target,
  CheckCircle2,
  TrendingUp,
  Users,
  Menu,
  X,
  Quote,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Intro from './Intro.jsx';
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
  { href: '#pse-ne', label: 'Pse Ne' },
  { href: '#rezultatet', label: 'Rezultatet' },
  { href: '#procesi', label: 'Procesi' }
];

// >>> ZËVENDËSO me numrin real të WhatsApp të biznesit,
//     format ndërkombëtar pa "+" (p.sh. 355691234567)
const WHATSAPP_NUMER = '355691234567';

// >>> ZËVENDËSO me profilet reale të biznesit
const INSTAGRAM_URL = 'https://instagram.com/amaimarketing';
const TIKTOK_URL = 'https://tiktok.com/@amaimarketing';

const SHERBIMET = [
  'Menaxhim Rrjetesh Sociale',
  'Zhvillim Web',
  'Automatizim Biznesi',
  'Strategji Marketingu'
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
          Amai Marketing<span>.</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '10px 20px' }}>
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
            <a href="#kontakt" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
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
      <div className="hero-bg"></div>
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
            <span>50+ biznese të ndihmuara këtë vit</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Kthe klikimet në <span>klientë besnikë</span> për biznesin tënd.
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtitle">
            Ne jemi partneri juaj strategjik për marketing dixhital. Ndërtojmë sisteme, menaxhojmë rrjete sociale dhe rrisim shitjet tuaja online me garanci.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#kontakt" className="btn btn-primary">
              Merr Konsultë Falas <ArrowRight size={20} />
            </a>
            <a href="#rezultatet" className="btn btn-outline">
              Shiko Rezultatet
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Clients() {
  const rowOne = ['BuildPro', 'Boutique Elegance', 'DentalCare Tirana', 'Kafe Aroma', 'TechNova', 'Fresh Market'];
  const rowTwo = ['Studio Lumo', 'AutoMax', 'GreenGarden', 'UrbanFit', 'Nova Estetik', 'Klaros Group'];

  const Group = ({ items, hidden }) => (
    <div className="clients-group" aria-hidden={hidden || undefined}>
      {items.map(name => (
        <span key={name} className="client-logo">
          <span className="mark" aria-hidden="true" />
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <section id="klientet" className="clients">
      <div className="container">
        <motion.p
          className="clients-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Bizneset që <strong>na besojnë</strong>
        </motion.p>
      </div>

      <div className="clients-marquee">
        <div className="clients-track">
          <Group items={rowOne} />
          <Group items={rowOne} hidden />
        </div>
      </div>

      <div className="clients-marquee">
        <div className="clients-track clients-track--reverse">
          <Group items={rowTwo} />
          <Group items={rowTwo} hidden />
        </div>
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
      title: 'Menaxhim Rrjetesh Sociale',
      desc: 'Krijojmë përmbajtje që angazhon dhe kthen ndjekësit në blerës përmes strategjive të provuara në Instagram, TikTok dhe Facebook.'
    },
    {
      icon: <Zap size={28} />,
      title: 'Zhvillim Web Modern',
      desc: 'Faqe interneti të shpejta, të optimizuara për celularë dhe të dizajnuara posaçërisht për të konvertuar vizitorët në lead-e.'
    },
    {
      icon: <Target size={28} />,
      title: 'Automatizim Biznesi',
      desc: 'Kursejmë kohën tuaj duke automatizuar proceset e shitjes, dërgimin e emaileve dhe ndjekjen e klientëve potencialë.'
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Strategji Marketingu',
      desc: 'Analizojmë tregun dhe konkurrencën për të ndërtuar një plan veprimi 90-ditor që rrit ROI-në tuaj në mënyrë të parashikueshme.'
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
          <motion.div
            className="why-us-image duotone"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Ekipi ynë duke punuar mbi një strategji marketingu"
            />
          </motion.div>

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

function CaseStudies() {
  return (
    <section id="rezultatet" className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      
      {/* ZËVENDËSOJENI KËTË VIDEO ME VIDEON TUAJ 
          Mund të ndryshoni 'src' me linkun e videos ose ta vendosni në dosjen public dhe ta thërrisni p.sh src="/video-ime.mp4" */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        src="/rruga-e-videos-suaj.mp4"
        poster="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      {/* Overlay për të bërë tekstin më të lexueshëm */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--red-900)',
        opacity: 0.75,
        zIndex: 1,
        mixBlendMode: 'multiply'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          style={{ marginBottom: 0 }}
        >
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Rezultate që Flasin Vetë</h2>
          <p className="section-subtitle" style={{ color: 'var(--red-100)' }}>
            Shikoni si kemi ndihmuar biznese të ngjashme me tuajin të shkallëzohen. <br/>
            (Videon tuaj mund ta zëvendësoni në kod tek skedari App.jsx)
          </p>
        </motion.div>
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
  const testimonials = [
    {
      text: 'Amai Marketing ndryshoi plotësisht mënyrën se si gjenerojmë klientë. Faqja e re që na ndërtuan pagoi veten brenda muajit të parë.',
      author: 'Arben H.',
      role: 'Themelues, BuildPro',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      text: "Profesionalizëm nga dita e parë. U rritëm me 30% në ndjekës dhe engagement-i është më i lartë se kurrë.",
      author: 'Enisa M.',
      role: 'Menaxhere, Boutique Elegance',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  return (
    <section className="section section-drench">
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

        <motion.div
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {testimonials.map(item => (
            <motion.div key={item.author} variants={fadeUp} className="testimonial-card">
              <Quote className="quote-icon" size={44} />
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <AvatarDuotone src={item.avatar} alt={item.author} />
                <div>
                  <div className="author-name">{item.author}</div>
                  <div className="author-role">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                alt="Portret i themeluesit të AMAI Marketing"
                loading="lazy"
              />
            </div>
            <div className="founder-badge">Themelues <span>&amp;</span> Drejtor</div>
          </motion.div>

          <motion.div
            className="founder-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="founder-eyebrow">Themeluesi</motion.p>

            <motion.blockquote variants={fadeUp} className="founder-quote">
              E ndërtova AMAI me një bindje të thjeshtë: çdo biznes lokal meriton <span>të njëjtin marketing</span> që përdorin markat e mëdha.
            </motion.blockquote>

            <motion.p variants={fadeUp} className="founder-text">
              Pas viteve duke parë biznese të shkëlqyera që humbisnin klientë vetëm sepse s'kishin praninë e duhur online, vendosa të krijoj një agjenci që flet gjuhën e pronarit — jo terma boshe, por shitje reale. Sot e ndihmoj çdo klient me të njëjtin kujdes sikur biznesi të ishte imi.
            </motion.p>

            <motion.div variants={fadeUp} className="founder-sign">
              <div>
                <div className="founder-name">Aleks Malaj</div>
                <div className="founder-role">Themelues &amp; Drejtor, AMAI Marketing</div>
              </div>
              <div className="founder-stats">
                <div>
                  <div className="founder-stat-value">50+</div>
                  <div className="founder-stat-label">Biznese</div>
                </div>
                <div>
                  <div className="founder-stat-value">6+</div>
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
              Rezervo konsultën tënde <span style={{ color: 'var(--red-500)' }}>falas</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="rezervime-lead">
              Plotëso formën dhe dërgoje direkt në WhatsApp. Të përgjigjemi po atë ditë me hapat konkretë për biznesin tënd.
            </motion.p>

            <motion.ul variants={fadeUp} className="rezervime-perks">
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Konsultë 30-minutëshe pa asnjë kosto</li>
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Përgjigje po atë ditë, jo pas javësh</li>
              <li className="rezervime-perk"><CheckCircle2 size={20} /> Plan konkret veprimi, jo premtime boshe</li>
            </motion.ul>

            <motion.div variants={fadeUp} className="wa-preview" aria-hidden="true">
              <div className="wa-preview-header">
                <span className="wa-preview-avatar">
                  <WhatsappIcon size={20} />
                </span>
                <div className="wa-preview-meta">
                  <span className="wa-preview-name">Amai Marketing</span>
                  <span className="wa-preview-status">online</span>
                </div>
                <span className="wa-preview-label">Parapamje</span>
              </div>
              <div className="wa-preview-body">
                <div className="wa-preview-bubble">
                  {previewLines.map((line, i) => (
                    <span key={i} className="wa-preview-line">{line}</span>
                  ))}
                  <span className="wa-preview-time">
                    {koha}
                    <svg viewBox="0 0 18 12" width="16" height="11" fill="none" aria-hidden="true">
                      <path d="M1 6.5 4 9.5 10 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 6.5 10 9.5 16 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
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
            <h2 className="logo">Amai Marketing<span>.</span></h2>
            <p className="footer-desc">
              Agjenci e specializuar në rritjen e bizneseve përmes strategjive të provuara dixhitale, dizajnit të web-it dhe automatizimeve.
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
              <a href="mailto:hello@amaimarketing.com" className="footer-link">
                <Mail size={16} /> hello@amaimarketing.com
              </a>
              <a href="tel:+355690000000" className="footer-link">
                <Phone size={16} /> +355 69 00 00 000
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Amai Marketing. Të gjitha të drejtat e rezervuara.</p>
          <div className="social-links">
            <a href="#" className="social-link" style={{ fontSize: '0.875rem' }}>Kushtet e Përdorimit</a>
            <a href="#" className="social-link" style={{ fontSize: '0.875rem' }}>Privatësia</a>
          </div>
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
        <Clients />
        <Services />
        <WhyUs />
        <CaseStudies />
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

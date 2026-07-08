import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
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
  Globe,
  MessageCircle,
  Share2,
  Mail,
  Phone
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Intro from './Intro.jsx';
import './App.css';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const viewportOnce = { once: true, margin: '-80px' };

const NAV_LINKS = [
  { href: '#sherbimet', label: 'Shërbimet' },
  { href: '#pse-ne', label: 'Pse Ne' },
  { href: '#rezultatet', label: 'Rezultatet' },
  { href: '#procesi', label: 'Procesi' }
];

// >>> ZËVENDËSO me numrin real të WhatsApp të biznesit,
//     format ndërkombëtar pa "+" (p.sh. 355691234567)
const WHATSAPP_NUMER = '355691234567';

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
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {services.map(service => (
            <motion.div key={service.title} variants={fadeUp} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </motion.div>
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
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
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
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
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

function Rezervime() {
  const [values, setValues] = useState({ emri: '', sherbimi: '', data: '', ora: '', mesazhi: '' });
  const [errors, setErrors] = useState({ emri: false, sherbimi: false });

  const update = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const formatoData = (data, ora) => {
    if (!data) return '';
    const [vit, muaj, dite] = data.split('-').map(Number);
    const d = new Date(vit, muaj - 1, dite);
    let tekst = d.toLocaleDateString('sq-AL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    if (ora) tekst += `, ora ${ora}`;
    return tekst;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emri = values.emri.trim();
    const sherbimi = values.sherbimi;

    const nextErrors = { emri: !emri, sherbimi: !sherbimi };
    setErrors(nextErrors);
    if (nextErrors.emri || nextErrors.sherbimi) return;

    const dataFormatuar = formatoData(values.data, values.ora);
    const mesazhi = values.mesazhi.trim();

    const rreshtat = [
      'Përshëndetje! Dua të rezervoj një konsultë.',
      `• Emri: ${emri}`,
      `• Shërbimi: ${sherbimi}`
    ];
    if (dataFormatuar) rreshtat.push(`• Data: ${dataFormatuar}`);
    if (mesazhi) rreshtat.push(`• Mesazhi: ${mesazhi}`);

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
              <a href="#" className="social-link" aria-label="Website"><Globe size={20} /></a>
              <a href="#" className="social-link" aria-label="WhatsApp"><MessageCircle size={20} /></a>
              <a href="#" className="social-link" aria-label="Rrjetet sociale"><Share2 size={20} /></a>
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
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

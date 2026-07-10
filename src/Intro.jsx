import { useEffect, useState } from 'react';
import './Intro.css';
import mainLogo from './assets/logo.png';

/* Preloader që luan një herë sa hapet faqja, pastaj zbehet dhe zbulon site-in. */
export default function Intro({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs = reduce ? 900 : 2500;

    document.body.classList.add('intro-lock');

    const tHide = setTimeout(() => setHiding(true), holdMs);
    const tDone = setTimeout(() => {
      document.body.classList.remove('intro-lock');
      onDone();
    }, holdMs + 650);

    return () => {
      clearTimeout(tHide);
      clearTimeout(tDone);
      document.body.classList.remove('intro-lock');
    };
  }, [onDone]);

  return (
    <div className={`intro ${hiding ? 'intro--hide' : ''}`} aria-hidden="true">
      <div className="intro__brand">
        <img src={mainLogo} alt="Amai Marketing" className="intro__logo" />
      </div>

      <div className="intro__curtain intro__curtain--back" />
      <div className="intro__curtain" />
    </div>
  );
}

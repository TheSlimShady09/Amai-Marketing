import { useEffect, useState } from 'react';
import './Intro.css';

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
        <div className="intro__mask">
          <div className="intro__word" aria-label="AMAI">
            <span className="ltr" style={{ animationDelay: '0.75s' }}>A</span>
            <span className="ltr" style={{ animationDelay: '0.83s' }}>M</span>
            <span className="ltr" style={{ animationDelay: '0.91s' }}>A</span>
            <span className="ltr" style={{ animationDelay: '0.99s' }}>I</span>
            <span className="intro__dot" style={{ animationDelay: '1.07s' }}>.</span>
          </div>
        </div>
        <div className="intro__sub">MARKETING</div>
        <div className="intro__rule" />
      </div>

      <div className="intro__curtain intro__curtain--back" />
      <div className="intro__curtain" />
    </div>
  );
}

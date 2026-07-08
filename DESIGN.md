# Design

## Theme

Dritë, dy ngjyra strikte: **e kuqe + e bardhë**. Asnjë gri, blu apo e zezë — çdo "neutral" është nuancë e të njëjtit ton të kuq. Fotografitë trajtohen **duotone** (hijet → e kuqe e thellë, dritat → e bardhë) me `filter: grayscale(1)` + `mix-blend-mode: screen` mbi sfond `--red-800`.

## Color Palette

Shkalla e vetme e të kuqes (token-et në `src/index.css`):

| Token | Vlera | Përdorimi |
|---|---|---|
| `--white` | #FFFFFF | Sfond kryesor, tekst mbi të kuqe |
| `--red-50` | #FFF4F4 | Sfonde seksionesh me tint (`.section-tint`), fill ikonash |
| `--red-100` | #FBE2E2 | Borde, tekst i zbutur mbi të kuqe të thellë |
| `--red-200` | #F4C2C3 | Borde të forta, hover |
| `--red-500` | #C1121F | **Primary** — butona, thekse, span-e në tituj (6.2:1 mbi të bardhë) |
| `--red-700` | #8C0A12 | Hover i primary |
| `--red-800` | #780001 | E kuqja e trashëguar e brandit — logo, baza duotone |
| `--red-900` | #4A0406 | Seksioni i zhytur (`.section-drench`, dëshmitë) |
| `--red-950` | #330203 | Footer |
| `--text-main` | #2E0405 | Tituj e tekst kryesor (ink i kuq, jo i zi) |
| `--text-muted` | #6E3335 | Tekst trupi (≥8.9:1 mbi çdo sfond të lejuar) |

Hijet janë të gjitha rgba me bazë të kuqe (`rgba(74,4,6,…)` / `rgba(193,18,31,…)`), kurrë të zeza neutrale (përveç mbi `.section-drench`).

## Typography

- Headings: **Poppins** 500–800, `letter-spacing: -0.02em`, `text-wrap: balance`.
- Body: **Inter** 300–600, line-height 1.65, `max-width` ~58–60ch.
- Shkallë fluide: `clamp()` për hero (2.5–3.75rem) dhe tituj seksionesh (2–2.75rem).

## Motion

- Easing i vetëm: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (quint) + `--ease-out-expo` për underline të nav-it. Asnjë bounce/elastic.
- Framer Motion: `fadeUp` (y:28, 0.7s) + `stagger` (0.12s) për reveal në scroll (`viewport once`, margin -80px); hero title me blur-reveal 0.9s.
- Hover: butona `translateY(-2px)` + glow i kuq; karta lift + hije; ikona shërbimesh ndërrojnë fill (rozë→kuqe) me rrotullim -4°; foto duotone `scale(1.04–1.06)` 0.8–0.9s.
- `MotionConfig reducedMotion="user"` + media query `prefers-reduced-motion` që fik gjithçka.

## Components

- **Butona**: `.btn-primary` (kuqe, glow në hover), `.btn-outline` (bordë red-200 → red-500), `.btn-white` (mbi sfonde të kuqe). Radius 10px.
- **Seksione**: alternim `.section-light` (bardhë) / `.section-tint` (red-50) / `.section-drench` (red-900, crescendo para CTA-së).
- **Navbar**: fixed, blur, merr bordë+hije pas 12px scroll (`.navbar-scrolled`); nav-link me underline `scaleX`; menu mobile me `AnimatePresence`.
- **Duotone**: klasa `.duotone` për çdo foto; `.avatar-duotone` për avatarë rrethorë.
- **CTA**: karta gradient `red-500 → red-800`, radius 28px, buton i bardhë.

## Layout

Container 1200px / padding 24px. Seksione `clamp(72px, 10vw, 120px)`. Grids `repeat(auto-fit, minmax(280–320px, 1fr))`. `scroll-padding-top: 96px` për anchor-ët nën navbar fiks.

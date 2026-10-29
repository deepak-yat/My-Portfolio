import { ArrowRight } from 'lucide-react';

function Cover() {
  return (
    <article className="book-page cover-page">
      <div className="cover-topline">
        <span>PORTFOLIO / 2026</span>
        <span>VOL. 01</span>
      </div>

      <div className="cover-main">
        <p className="eyebrow">SOFTWARE DEVELOPER · KOCHI, INDIA</p>

        <h1>
          Deepak
          <br />
          <span>T D.</span>
        </h1>

        <div className="cover-divider" />

        <p className="cover-description">
          Building digital experiences through thoughtful engineering,
          clean architecture, and continuous learning.
        </p>

        <div className="cover-cta">
          <span>EXPLORE MY WORK</span>
          <ArrowRight size={18} strokeWidth={1.5} />
        </div>
      </div>

      <div className="cover-bottom">
        <span>SELECTED WORK & EXPERIENCE</span>
        <span>2024 — 2026</span>
      </div>
    </article>
  );
}

export default Cover;
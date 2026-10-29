import '../styles/Cover.css';
function Cover({ variant = 'front' }) {
  if (variant === 'back') {
    return (
      <article className="book-page cover-page cover-back">
        <div className="cover-frame">
          <div className="back-cover-content">
            <span className="back-cover-symbol">✳</span>

            <p className="back-cover-quote">
              Every great idea
              <br />
              begins with curiosity.
            </p>

            <div className="back-cover-divider" />

            <p className="back-cover-caption">
              BUILT WITH CURIOSITY
              <br />
              SHAPED BY CODE
              <br />
              DRIVEN BY CREATIVITY
            </p>
          </div>

          <div className="cover-bottom">
            <span>DEEPAK T D</span>
            <span>2026</span>
          </div>
        </div>
      </article>
    );
  }
if (variant === 'inside') {
  return (
    <article className="book-page cover-page cover-inside">
      <div className="cover-frame">
        <div className="inside-cover-content">
          <span className="inside-cover-ornament">✳</span>

          <p className="inside-cover-eyebrow">
            BEFORE WE BEGIN
          </p>

          <h2 className="inside-cover-title">
            Every developer
            <br />
            has a story.
          </h2>

          <div className="inside-cover-divider" />

          <p className="inside-cover-description">
            Mine is built on curiosity, a love for solving problems,
            and the desire to turn ideas into meaningful digital
            experiences.
          </p>

          <p className="inside-cover-signature">
            — DEEPAK T D
          </p>
        </div>

        <div className="cover-bottom">
          <span>MY STORY · MY JOURNEY</span>
          <span>01</span>
        </div>
      </div>
    </article>
  );
}
  return (
    <article className="book-page cover-page">
      <div className="cover-frame">
        <div className="cover-topline">
          <span>PERSONAL PORTFOLIO · 2026</span>
          <span>VOL. 01</span>
        </div>

        <div className="cover-main">
          <p className="cover-eyebrow">
            SOFTWARE ENGINEER · KOCHI, INDIA
          </p>

          <h1 className="cover-title">
            <span>DEEPAK</span>
            <span>THE TECHY GUY</span>
          </h1>

          <span className="cover-ornament" aria-hidden="true">
            ✳
          </span>

          <div className="cover-divider" />

          <p className="cover-subtitle">
            A DEVELOPER'S STORY
          </p>
        </div>

        <div className="cover-bottom">
          <span>CODE · CREATIVITY · CURIOSITY</span>
          <span>2026</span>
        </div>
      </div>
    </article>
  );
}

export default Cover;
import { useEffect, useRef, useState } from 'react';
import '../styles/Bookshelf.css';

const FLIGHT_DURATION = 1500;

function Bookshelf({ onBookSelect }) {
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [flight, setFlight] = useState(null);

useEffect(() => {
  document.documentElement.classList.toggle(
    'golden-dissolve',
    Boolean(flight)
  );

  return () => {
    document.documentElement.classList.remove('golden-dissolve');
  };
}, [flight]);

useEffect(() => {
  return () => window.clearTimeout(timeoutRef.current);
}, []);

  const handleBookSelect = () => {
    if (flight || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    // The final size represents a closed, portrait-format hardcover.
    const targetWidth = Math.min(400, window.innerWidth * 0.78);
    const targetHeight = Math.min(
      targetWidth * 1.35,
      window.innerHeight * 0.72
    );

    const sourceCenterX = rect.left + rect.width / 2;
    const sourceCenterY = rect.top + rect.height / 2;

setFlight({
  id: Date.now(),

  sourceX: sourceCenterX,
  sourceY: sourceCenterY,

  deltaX: sourceCenterX - window.innerWidth / 2,
  deltaY: sourceCenterY - window.innerHeight / 2,

  startScaleX: rect.width / targetWidth,
  startScaleY: rect.height / targetHeight,
});

    // Fallback in case animation events are interrupted.
    timeoutRef.current = window.setTimeout(() => {
      onBookSelect();
    }, FLIGHT_DURATION + 80);
  };

  const finishFlight = (event) => {
    // Ignore animation events bubbling from the book's child elements.
    if (event.target !== event.currentTarget || !flight) return;

    window.clearTimeout(timeoutRef.current);
    onBookSelect();
  };

  return (
    <section
      className={`bookshelf-scene ${flight ? 'is-launching' : ''}`}
      aria-label="Deepak's bookshelf"
    >
      <div className="bookshelf-frame">
        <img
          src="/shelf-1.png"
          alt="Vintage hardcover books on a dark wooden shelf"
          className="bookshelf-image"
          draggable="false"
        />

        <div className="bookshelf-vignette" aria-hidden="true" />

        <div className="featured-book-hotspot">
          <button
            ref={triggerRef}
            type="button"
            className="featured-book-trigger"
            aria-label="Pick up Deepak: The Techy Guy"
            disabled={Boolean(flight)}
            onClick={handleBookSelect}
          >
            <span className="book-light-sweep" aria-hidden="true" />
          </button>

          <span className="book-hover-hint" aria-hidden="true">
            <span className="book-hover-hint-title">
              Deepak: The Techy Guy
            </span>
            <span className="book-hover-hint-action">
              Pull me from the shelf ↗
            </span>
          </span>
        </div>

        {flight && (
          <div className="featured-book-mask" aria-hidden="true" />
        )}
      </div>

      {flight && (
        <>
          {/* Darkens the entire landing page while the book moves. */}
          <div className="book-flight-backdrop" aria-hidden="true">
  <div
    className="golden-particle-burst"
    style={{
      '--burst-x': `${flight.sourceX}px`,
      '--burst-y': `${flight.sourceY}px`,
    }}
  >
    {Array.from({ length: 65 }, (_, index) => {
  const angle = (index / 65) * Math.PI * 2;
  const distance = 100 + ((index * 47) % 320);

  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <span
      key={index}
      className={`golden-particle golden-particle-${index % 4}`}
      style={{
        '--particle-x': `${x}px`,
        '--particle-y': `${y}px`,
        '--particle-size': `${2 + (index % 4)}px`,
        '--particle-delay': `${(index % 10) * 20}ms`,
      }}
    />
  );
})}
  </div>
</div>

          {/* Independent 3D book travelling toward the centre. */}
          <div
            key={flight.id}
            className="book-flight-layer"
            style={{
              '--flight-x': `${flight.deltaX}px`,
              '--flight-y': `${flight.deltaY}px`,
              '--start-scale-x': flight.startScaleX,
              '--start-scale-y': flight.startScaleY,
              '--flight-duration': `${FLIGHT_DURATION}ms`,
              '--book-width': `${Math.min(
                400,
                window.innerWidth * 0.78
              )}px`,
              '--book-height': `${Math.min(
                Math.min(400, window.innerWidth * 0.78) * 1.35,
                window.innerHeight * 0.72
              )}px`,
            }}
            onAnimationEnd={finishFlight}
            aria-hidden="true"
          >
            <div className="book-3d">
<div className="book-face book-front">
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
</div>

              <div className="book-face book-back" />

              <div className="book-face book-spine">
                <span>DEEPAK · THE TECHY GUY</span>
              </div>

              <div className="book-face book-pages" />
              <div className="book-face book-top" />
              <div className="book-face book-bottom" />
            </div>
          </div>
        </>
      )}

      <p className="bookshelf-caption">
        Your next read is waiting.
      </p>
    </section>
  );
}

export default Bookshelf;

import { useRef, useState } from 'react';
import { GrabfoldBook } from 'grabfold/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Cover from './Cover';
import Contents from './Contents';
import Introduction from './Introduction';
import '../styles/Book.css';

function Book() {
  const bookRef = useRef(null);
const [position, setPosition] = useState(-2);
const handleBookClick = (event) => {
  if (
    event.target.closest(
      'a, button, input, textarea, select, [data-no-drag]'
    )
  ) {
    return;
  }

  // Open the book when its cover is clicked.
  if (position <= -2) {
    bookRef.current?.next();
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - bounds.left;

  if (clickX >= bounds.width / 2) {
    bookRef.current?.next();
  } else {
    bookRef.current?.prev();
  }
};
  return (
    <section className="interactive-book">
      <div className="book-caption">
        <span>AN INTERACTIVE PORTFOLIO</span>
        <span>GRAB · FOLD · EXPLORE</span>
      </div>

      <div
  className="book-wrapper grabfold-wrapper"
  onClick={handleBookClick}
>
        <GrabfoldBook
          ref={bookRef}
          sheets={2}
pageRatio={400 / 540}
fit="width"
layout="auto"
covers="hard"
defaultPosition={-2}
          duration={850}
          commitAt={0.4}
          dragThreshold={8}
          shadow={0.55}
          gutter={0.35}
          lift={45}
          thickness={8}
          peek
          flick
          gestures
          keyboard
          label="Deepak's developer portfolio"
          position={position}
          onPositionChange={setPosition}
          renderPage={(page) => {
            console.log('Grabfold page metadata:', page);
if (page.kind === 'cover') {
return (
<div className="grabfold-page-content">
{page.face === 'inside' ? (
<Cover variant="inside" />
) : page.side === 'back' ? (
<Cover variant="back" />
) : (
<Cover variant="front" />
)}
</div>
);
}
            if (page.sheet === 0 && page.kind === 'front') {
              return (
                <div className="grabfold-page-content">
                  <Contents />
                </div>
              );
            }

            if (page.sheet === 0 && page.kind === 'back') {
              return (
                <div className="grabfold-page-content">
                  <Introduction />
                </div>
              );
            }

            return (
              <div className="grabfold-page-content">
                <article className="book-page">
                  <p className="eyebrow">MORE COMING SOON</p>
                  <h2>
                    Every page
                    <br />
                    has a story.
                  </h2>
                </article>
              </div>
            );
          }}
        />
      </div>

      <div className="book-controls">
        <button
          className="page-control"
          onClick={() => bookRef.current?.prev()}
          disabled={position <= -1}
          aria-label="Previous page"
        >
          <ArrowLeft size={17} />
          <span>PREVIOUS</span>
        </button>

        <span className="page-counter" aria-live="polite">
          {String(Math.max(1, position + 2)).padStart(2, '0')}
          <span> / </span>
          04
        </span>

        <button
          className="page-control"
          onClick={() => bookRef.current?.next()}
          aria-label="Next page"
        >
          <span>NEXT</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

export default Book;

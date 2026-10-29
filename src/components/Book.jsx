
import { useCallback, useRef, useState } from 'react';
import { GrabfoldBook } from 'grabfold/react';
import { webglFold, supportsWebGL } from 'grabfold/webgl';
import { toCanvas } from 'html-to-image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Cover from './Cover';
import Contents from './Contents';
import Introduction from './Introduction';
import '../styles/Book.css';

const PAPER_COLOR = '#f2eee4';

function getPageKey(page) {
  if (page.kind === 'cover') {
    return `cover-${page.side}-${page.face}`;
  }

  return `${page.kind}-${page.sheet}`;
}

function Book() {
  const bookRef = useRef(null);
  const pageNodes = useRef(new Map());
  const textureCache = useRef(new Map());
  const [position, setPosition] = useState(-1);

  const registerPage = useCallback((page, node) => {
    const key = getPageKey(page);

    if (node) {
      pageNodes.current.set(key, node);
    } else {
      pageNodes.current.delete(key);
    }
  }, []);

  const getTexture = useCallback(async (page) => {
    const key = getPageKey(page);

    if (textureCache.current.has(key)) {
      return textureCache.current.get(key);
    }

    // The React portal may not have mounted when the texture is requested.
    // Wait briefly for its page element to become available.
    let node = pageNodes.current.get(key);

    for (let attempt = 0; !node && attempt < 20; attempt += 1) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      node = pageNodes.current.get(key);
    }

    if (!node) {
      console.warn(`Grabfold: page texture not ready for ${key}`);
      return null;
    }

    try {
      const canvas = await toCanvas(node, {
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor: PAPER_COLOR,
        cacheBust: true,
      });

      textureCache.current.set(key, canvas);
      return canvas;
    } catch (error) {
      console.error(`Could not capture page texture: ${key}`, error);
      return null;
    }
  }, []);

  const foldRenderer = useRef(null);

  if (foldRenderer.current === null && supportsWebGL()) {
    foldRenderer.current = webglFold({
      texture: getTexture,
      radius: 0.14,
      segments: 48,
      maxPixelRatio: 2,
      cache: 8,
    });
  }

  const renderContent = (page) => {
    if (page.kind === 'cover') {
      return <Cover />;
    }

    if (page.sheet === 0 && page.kind === 'front') {
      return <Contents />;
    }

    if (page.sheet === 0 && page.kind === 'back') {
      return <Introduction />;
    }

    return (
      <article className="book-page">
        <p className="eyebrow">MORE COMING SOON</p>
        <h2>
          Every page
          <br />
          has a story.
        </h2>
      </article>
    );
  };

  const nextPage = () => {
    bookRef.current?.next();
  };

  const previousPage = () => {
    bookRef.current?.prev();
  };

  return (
    <section className="interactive-book">
      <div className="book-caption">
        <span>AN INTERACTIVE PORTFOLIO</span>
        <span>GRAB · FOLD · EXPLORE</span>
      </div>

      <div className="book-wrapper grabfold-wrapper">
        <GrabfoldBook
          ref={bookRef}
          sheets={2}
          pageRatio={400 / 540}
          layout="auto"
          covers="inside"
          duration={850}
          commitAt={0.4}
          dragThreshold={8}
          shadow={0.55}
          gutter={0.35}
          lift={55}
          thickness={8}
          peek
          flick
          gestures
          keyboard
          label="Deepak's developer portfolio"
          position={position}
          onPositionChange={setPosition}
          foldRenderer={foldRenderer.current ?? undefined}
          renderPage={(page) => (
            <div
              ref={(node) => registerPage(page, node)}
              className="grabfold-page-content"
              data-page-key={getPageKey(page)}
            >
              {renderContent(page)}
            </div>
          )}
        />
      </div>

      <div className="book-controls">
        <button
          className="page-control"
          onClick={previousPage}
          disabled={!bookRef.current?.canPrev()}
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
          onClick={nextPage}
          disabled={!bookRef.current?.canNext()}
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

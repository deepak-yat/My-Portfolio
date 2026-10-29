import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Cover from './Cover';
import Contents from './Contents';
import Introduction from './Introduction';
import '../styles/Book.css';

function Book() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    { id: 'cover', component: <Cover /> },
    { id: 'contents', component: <Contents /> },
    { id: 'introduction', component: <Introduction /> },
  ];

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const previousPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  return (
    <section className="interactive-book">
      <div className="book-caption">
        <span>AN INTERACTIVE PORTFOLIO</span>
        <span>TURN THE PAGE TO EXPLORE</span>
      </div>

      <div className="book-wrapper">
<HTMLFlipBook
  ref={bookRef}
  width={400}
  height={540}
  size="stretch"
  minWidth={280}
  maxWidth={400}
  minHeight={400}
  maxHeight={540}
  maxShadowOpacity={0.45}
  showCover
  mobileScrollSupport
  usePortrait
  drawShadow
  flippingTime={1100}
  swipeDistance={20}
  useMouseEvents
  onFlip={(event) => setCurrentPage(event.data)}
  className="portfolio-book"
>
  {pages.map((page) => (
    <div className="page-shell" key={page.id}>
      {page.component}
    </div>
  ))}
</HTMLFlipBook>
      </div>

      <div className="book-controls">
        <button
          className="page-control"
          onClick={previousPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ArrowLeft size={17} />
          <span>PREVIOUS</span>
        </button>

        <span className="page-counter">
          {String(currentPage + 1).padStart(2, '0')}
          <span> / </span>
          {String(pages.length).padStart(2, '0')}
        </span>

        <button
          className="page-control"
          onClick={nextPage}
          disabled={currentPage >= pages.length - 1}
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
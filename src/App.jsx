
import { useState } from 'react';
import Book from './components/Book';
import Bookshelf from './components/Bookshelf';
import './App.css';

function App() {
  const [isBookSelected, setIsBookSelected] = useState(false);

  return (
    <main className="portfolio">
      <header className="portfolio-header">
        <a className="brand" href="#home">
          DEEPAK T D
          <span>PERSONAL PORTFOLIO · 2026</span>
        </a>

        <div className="header-note">
          AN INTERACTIVE PORTFOLIO
          <span>DESIGNED AS A BOOK</span>
        </div>
      </header>

      <section className="opening-stage" id="home">
        {!isBookSelected ? (
          <div className="opening-layout">
            <section className="opening-intro">
              <span className="intro-eyebrow">
                A LITTLE INTRODUCTION
              </span>

              <h1>
                Good to see you<span className="intro-period">.</span>
                <br />
                I'm <span className="intro-name">Deepak.</span>
              </h1>

              <p className="intro-description">
                A passionate software engineer who loves turning
                ideas into meaningful digital experiences.
              </p>

              <div className="intro-invitation">
                <span className="invitation-line" />

                <p>
                  Wanna know more about me?
                  <br />
                  Grab that book over there named
                  <br />
                  <strong>“Deepak: The Techy Guy.”</strong>
                </p>

                <span className="invitation-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <p className="intro-footnote">
                NO BORING BIOS. JUST MY STORY, ONE PAGE AT A TIME.
              </p>
            </section>

            <Bookshelf onBookSelect={() => setIsBookSelected(true)} />
          </div>
        ) : (
          <div className="book-arrival">
            <button
              type="button"
              className="back-to-shelf"
              onClick={() => setIsBookSelected(false)}
            >
              <span aria-hidden="true">←</span>
              Back to the shelf
            </button>

            <Book />
          </div>
        )}
      </section>

      <footer className="portfolio-footer">
        <span>INDEPENDENT DEVELOPER PORTFOLIO</span>
        <span>KOCHI, INDIA</span>
      </footer>
    </main>
  );
}

export default App;

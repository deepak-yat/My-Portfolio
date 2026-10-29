import Book from './components/Book';
import './App.css';

function App() {
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

      <section className="book-stage" id="home">
        <Book />
      </section>

      <footer className="portfolio-footer">
        <span>INDEPENDENT DEVELOPER PORTFOLIO</span>
        <span>KOCHI, INDIA</span>
      </footer>
    </main>
  );
}

export default App;
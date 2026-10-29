import { ArrowDownRight } from 'lucide-react';

function Introduction() {
  return (
    <article className="book-page introduction-page">
      <div className="page-topline">
        <span>01 / ABOUT</span>
        <span>THE DEVELOPER</span>
      </div>

      <div className="introduction-main">
        <p className="eyebrow">A LITTLE ABOUT ME</p>

        <h2>
          Curious by nature.
          <br />
          <span>Developer by choice.</span>
        </h2>

        <p className="introduction-copy">
          I'm Deepak, a Computer Science graduate and software developer
          interested in building reliable, useful, and thoughtfully
          designed applications.
        </p>

        <p className="introduction-copy">
          From designing backend APIs to building responsive interfaces,
          I enjoy understanding how the pieces of a system work together.
          My work on Foodly has given me hands-on experience with full-stack
          development, databases, authentication, and application architecture.
        </p>

        <div className="introduction-note">
          <ArrowDownRight size={20} strokeWidth={1.4} />
          <span>GOOD SOFTWARE STARTS WITH GOOD QUESTIONS.</span>
        </div>
      </div>

      <div className="page-bottomline">
        <span>ABOUT ME</span>
        <span>03</span>
      </div>
    </article>
  );
}

export default Introduction;
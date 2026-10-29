function Contents() {
  const sections = [
    { number: '01', title: 'About me', detail: 'THE PERSON BEHIND THE CODE' },
    { number: '02', title: 'Expertise', detail: 'TOOLS & TECHNOLOGIES' },
    { number: '03', title: 'Experience', detail: 'MY PROFESSIONAL JOURNEY' },
    { number: '04', title: 'Foodly', detail: 'FULL-STACK FOOD ORDERING PLATFORM' },
    { number: '05', title: 'Selected projects', detail: 'RFID ATTENDANCE & PROJECT IRIS' },
    { number: '06', title: 'Contact', detail: 'LET’S CONNECT' },
  ];

  return (
    <article className="book-page content-page">
      <div className="page-topline">
        <span>INDEX</span>
        <span>CONTENTS</span>
      </div>

      <div className="contents-heading">
        <p className="eyebrow">A GUIDE TO THIS BOOK</p>
        <h2>Table of<br />Contents<span>.</span></h2>
      </div>

      <div className="contents-list">
        {sections.map((section) => (
          <div className="contents-item" key={section.number}>
            <span className="contents-number">{section.number}</span>

            <div className="contents-info">
              <h3>{section.title}</h3>
              <p>{section.detail}</p>
            </div>

            <span className="contents-arrow">↗</span>
          </div>
        ))}
      </div>

      <div className="page-bottomline">
        <span>DEEPAK T D</span>
        <span>02</span>
      </div>
    </article>
  );
}

export default Contents;
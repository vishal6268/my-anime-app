import React from 'react';

function HeroSection({ onSectionToggle, portfolioItems }) {
  const handlePortfolioClick = (sectionName, event) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent
    onSectionToggle(sectionName);
  };

  return (
    <div className="hero-section">
      <div className="about-text hover-target" onClick={() => onSectionToggle('about')}>
        about
      </div>
      <div className="contact-text hover-target" onClick={() => onSectionToggle('contact')}>
        contact
      </div>
      <div className="section-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1>VISHAL</h1>
            </div>
            <div className="col-12 text-center mb-2">
              <div className="dancing">Anime Collection</div>
            </div>
            <div className="col-12 text-center mt-4 mt-lg-5">
              <div className="portfolio-grid">
                {portfolioItems.map((item) => (
                  <span
                    key={item.name}
                    className={`${item.name} hover-target`}
                    onClick={(e) => handlePortfolioClick(item.name, e)}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
import React from 'react';

function PortfolioSection({ sectionClass, title, subtitle, description, images, isActive, onClose, onImageClick }) {
  const sectionClassName = `${sectionClass}-section portfolio-section ${isActive ? 'active' : ''}`;
  const closeButtonClass = `${sectionClass}-close portfolio-close hover-target`;

  return (
    <div className={sectionClassName}>
      <div className={closeButtonClass} onClick={onClose}></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3>{title}</h3>
          </div>
          <div className="col-12 mt-3 text-center">
            <p><span>{subtitle}</span></p>
          </div>
          <div className="col-12 text-center">
            <p>{description}</p>
          </div>
          {images.map((image, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <img
                src={image.src}
                alt={image.alt}
                onClick={() => onImageClick(image, index, images)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;
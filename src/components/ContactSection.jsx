import React from 'react';

function ContactSection({ isActive, onClose }) {
  const sectionClassName = `contact-section ${isActive ? 'active' : ''}`;
  return (
    <div className={sectionClassName}>
      <div className="contact-close hover-target" onClick={onClose}></div>
      <div className="section-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <a href="mailto:iamvishalchoudhary7@gmail.com" className="hover-target">
                iamvishalchoudhary7@gmail.com
              </a>
            </div>
            <div className="col-12 text-center social mt-4">
              <a href="#" className="hover-target">
                instagram
              </a>
              <a href="#" className="hover-target">
                twitter
              </a>
              <a href="#" className="hover-target">
                discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
import React from 'react';

function AboutSection({ isActive, onClose }) {
  const sectionClassName = `about-section ${isActive ? 'active' : ''}`;
  return (
    <div className={sectionClassName}>
      <div className="about-close hover-target" onClick={onClose}></div>
      <div className="section-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiM4NjZCQUYiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMloiLz4KPHN2ZyB4PSIyIiB5PSI4IiB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMjJDNi40OCAyMiAyIDE3LjUyIDIgMTJTNi40OCAyIDEyIDJTMjIgNi40OCAyMiAxMlMxNy41MiAyMiAxMiAyMloiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K"
                alt="Profile"
              />
            </div>
            <div className="col-lg-8 text-center mt-4">
              <p>
                Welcome to my anime collection! I'm passionate about anime, manga, and Japanese culture. This portfolio showcases my favorite series and characters from the incredible world of anime.
              </p>
            </div>
            <div className="col-12 text-center">
              <p>
                <span>VISHAL</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
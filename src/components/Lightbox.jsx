import React, { useState, useEffect } from 'react';

const Lightbox = ({ isOpen, image, onClose, onNext, onPrev }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    setScale(1);
  }, [image]);

  if (!isOpen || !image) return null;

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.25, 1));
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.alt || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="lightbox-fade-in"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={onClose}
      onWheel={(e) => { if(e.deltaY < 0) setScale(s => Math.min(s + 0.1, 3)); else setScale(s => Math.max(s - 0.1, 1)); }}
    >
      <div
        className="hover-target"
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          fontSize: '40px',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 10001,
        }}
        onClick={onClose}
      >
        &times;
      </div>
      
      {/* Zoom Buttons */}
      <div
        className="hover-target"
        style={{
          position: 'absolute',
          top: '25px',
          right: '130px',
          cursor: 'pointer',
          zIndex: 10001,
          color: '#fff',
        }}
        onClick={handleZoomIn}
        title="Zoom In"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <div
        className="hover-target"
        style={{
          position: 'absolute',
          top: '25px',
          right: '180px',
          cursor: 'pointer',
          zIndex: 10001,
          color: '#fff',
        }}
        onClick={handleZoomOut}
        title="Zoom Out"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>

      {/* Download Button */}
      <div
        className="hover-target"
        style={{
          position: 'absolute',
          top: '25px',
          right: '80px',
          cursor: 'pointer',
          zIndex: 10001,
          color: '#fff',
        }}
        onClick={handleDownload}
        title="Download"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </div>

      {/* Navigation Arrows */}
      <div 
        className="hover-target"
        style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'white',
            fontSize: '40px',
            zIndex: 10001,
            userSelect: 'none'
        }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        &#10094;
      </div>
      <div 
        className="hover-target"
        style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'white',
            fontSize: '40px',
            zIndex: 10001,
            userSelect: 'none'
        }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        &#10095;
      </div>

      <img
        key={image.src}
        src={image.src}
        alt={image.alt}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          cursor: 'default',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Lightbox;
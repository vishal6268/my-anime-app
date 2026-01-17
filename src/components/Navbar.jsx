import React, { useState, useRef } from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };

  const handleMouseUp = () => { isDragging.current = false; };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position]);

  return (
    <div 
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: 'none',
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 9999
      }}
      onMouseDown={handleMouseDown}
    >
      <button
        onClick={toggleDarkMode}
        type="button"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          backgroundColor: darkMode ? '#333' : '#fff', // Dark mode mein dark background, light mein white
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          padding: '0',
          outline: 'none'
        }}
      >
        {darkMode ? (
          /* Sun Icon - Hardcoded Yellow Color */
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#FBBF24">
            <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 100-2h-2zm0 18v2a1 1 0 102 0v-2a1 1 0 100-2h-2zm8.657-14.243l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414zM4.343 18.364l1.414-1.414a1 1 0 10-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm14.314 0l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zM4.343 5.636l1.414 1.414a1 1 0 101.414-1.414L5.757 4.222a1 1 0 00-1.414 1.414z" />
          </svg>
        ) : (
          /* Moon Icon - Hardcoded Dark Blue/Black Color */
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#1E293B">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Navbar;
import React, { useEffect } from 'react';

function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursor2 = document.getElementById('cursor2');
    const cursor3 = document.getElementById('cursor3');

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
      if (cursor2) {
        cursor2.style.left = e.clientX + 'px';
        cursor2.style.top = e.clientY + 'px';
      }
      if (cursor3) {
        cursor3.style.left = e.clientX + 'px';
        cursor3.style.top = e.clientY + 'px';
      }
    };

    const handleMouseOver = () => {
      if (cursor2) cursor2.classList.add('hover');
      if (cursor3) cursor3.classList.add('hover');
    };

    const handleMouseOut = () => {
      if (cursor2) cursor2.classList.remove('hover');
      if (cursor3) cursor3.classList.remove('hover');
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseover', handleMouseOver);
      target.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      hoverTargets.forEach(target => {
        target.removeEventListener('mouseover', handleMouseOver);
        target.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor2" id="cursor2"></div>
      <div className="cursor3" id="cursor3"></div>
    </>
  );
}

export default Cursor;
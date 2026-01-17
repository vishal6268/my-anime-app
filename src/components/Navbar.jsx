import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300">
      {/* Humne 'justify-end' use kiya hai taaki button hamesha right side mein rahe */}
      <div className="max-w-screen-xl flex items-center justify-end mx-auto p-4">
        
        {/* Only Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          type="button"
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            /* Dark Mode mein Sun SVG dikhega */
            <img src="/icons/svg/sun.svg" alt="Sun" className="w-6 h-6" />
          ) : (
            /* Light Mode mein Moon SVG dikhega */
            <img src="/icons/svg/moon.svg" alt="Moon" className="w-6 h-6" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
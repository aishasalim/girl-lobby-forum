import React, { useState, useContext, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  
  ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const theme = darkMode ? 'dark' : 'light';

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.getElementById('root');
    root.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

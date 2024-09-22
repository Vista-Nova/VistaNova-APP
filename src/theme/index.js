import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native'
import light from './light';
import dark from './dark';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark'? dark : light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === light ? dark : light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

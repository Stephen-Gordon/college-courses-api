import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
 */
import "inter-ui/inter.css";

import { ThemeProvider } from '@mui/material';

import customtheme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={customtheme}>
      <App />
  </ThemeProvider>
);


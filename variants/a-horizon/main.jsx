import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../shared/App.jsx';
import Shell from './Shell.jsx';

createRoot(document.getElementById('root')).render(<App Shell={Shell} defaultTheme="light" />);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import WelcomeReact from './WelcomeReact';
import Test from './Test';
import NewTest from './newTest.jsx';
import Interval from './Interval.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <WelcomeReact/> */}
    
    <Interval name="Nehal" age="20" />
    <Interval name="Ali" age="25" />
    <NewTest name="Nehal" age="20" />
  </StrictMode>
);

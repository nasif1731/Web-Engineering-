import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './Component/App.jsx';
import WelcomeReact from './Component/WelcomeReact.jsx';
import Test from './Component/Test.jsx';
import NewTest from './Component/newTest.jsx';
import Interval from './Component/Interval.jsx';
import FriendList from './Component/FriendList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <WelcomeReact/> */}
    
    {/* <Interval name="Nehal" age="20" />
    <Interval name="Ali" age="25" />
    <NewTest name="Nehal" age="20" /> */}

    <FriendList/>


  </StrictMode>
);

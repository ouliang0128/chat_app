// pages/index.tsx
import '../styles/globals.css'
import React from 'react';
import Chatbot from './Chatbot.jsx';
import Projects from './Projects';
import Sidenav from './Sidenav';
import Main from './Main';
import Work from './Work';
const HomePage = () => {
  return (
    <div>
      <Sidenav />
      <Main />
      <Work />
      <Projects />
      <Chatbot />
    </div>
  );
};

export default HomePage;

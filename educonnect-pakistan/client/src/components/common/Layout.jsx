// Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

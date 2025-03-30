// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-[#5C3A21] text-[#f8f1e4] text-center py-4 mt-10">
    <p className="text-sm">
      © {new Date().getFullYear()} EduConnect Pakistan. All rights reserved.
    </p>
  </footer>
);

export default Footer;

// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, type = 'button', onClick, className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#5A3A22] hover:bg-[#7A4D30] text-white px-4 py-2 rounded transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

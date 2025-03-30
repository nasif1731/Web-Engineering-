// Card.jsx
import React from 'react';

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
    {children}
  </div>
);

export default Card;

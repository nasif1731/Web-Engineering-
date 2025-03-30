// Input.jsx
import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder = '', required = false }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium text-sm">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="p-2 border border-[#B08968] rounded focus:outline-none focus:border-[#7A4D30]"
    />
  </div>
);

export default Input;

// src/components/Register/InputField.jsx
import React from "react";

const InputField = ({ label, type = "text", name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1 text-white">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
        required
      />
    </div>
  );
};

export default InputField;

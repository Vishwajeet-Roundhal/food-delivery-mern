import React from 'react'

const InputField = ({ label, id, name, value, onChange, required }) => (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-bold mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        required={required}
      />
    </div>
  );

export default InputField
import React from 'react'

const PrimaryButton = ({ children, type, ...props }) => (
    <button {...props} className="w-25 mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">
      {children}
    </button>
  );

export default PrimaryButton
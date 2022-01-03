import React from 'react';

function Input({ label, name, type, ...props }) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} {...props} />
    </>
  );
}

Input.defaultProps = {
  type: 'text',
};

export default Input;

import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readOnly?: boolean;
  placeholder?: string;
  additionalStyles?: string;
  rows?: number;
  cols?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  readOnly = false,
  placeholder = '',
  additionalStyles = '',
  rows = 4,
  cols = 50,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-white mb-2" htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          className={`w-full p-3 text-white bg-transparent border-2 border-transparent ${additionalStyles}`}
          style={{
            borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
            outline: 'none',
          }}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full p-3 text-white bg-transparent border-2 border-transparent ${additionalStyles}`}
          style={{
            borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
            outline: 'none',
          }}
        />
      )}
    </div>
  );
};

export default Input;

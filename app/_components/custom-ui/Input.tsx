import React from 'react';
import { LucideIcon } from 'lucide-react';

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
  icon?: LucideIcon; // Lucide icon component
  onBlur?: any;
}
export const inputBaseClasses = (hasIcon: boolean) => {
  return [
    'w-full',
    'p-3',
    'text-white',
    'bg-transparent',
    'border-2',
    'border-transparent',
    hasIcon ? 'pl-10' : '',
  ].join(' ');
};

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
  icon: Icon,
  onBlur,
}) => {
  const wrapperClasses = 'relative w-full';
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-white mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {Icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-white">
            <Icon size={18} />
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
            onBlur={onBlur}
            rows={rows}
            cols={cols}
            className={`${inputBaseClasses(Icon ? true : false)} ${additionalStyles}`}
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
            onBlur={onBlur}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`${inputBaseClasses(Icon ? true : false)} ${additionalStyles}`}
            style={{
              borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
              outline: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Input;

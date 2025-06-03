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
  icon?: LucideIcon;
  onBlur?: any;
}

export const inputBaseClasses = (hasIcon: boolean) => {
  return [
    'w-full',
    'py-2', // reduced vertical padding
    'px-3',
    'text-white',
    'bg-transparent',
    'border-2',
    'border-transparent',
    'rounded-md', // apply rounded corners
    'text-sm',
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
    <div className="mb-4">
      {label && (
        <label
          className="block text-white mb-1 text-sm font-medium"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {Icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-white">
            <Icon size={16} />
          </div>
        )}

        <div
          className={`w-full rounded-lg p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] ${additionalStyles}`}
        >
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
              className={`w-full p-3 text-white bg-[#1c102b] rounded-lg outline-none resize-vertical ${Icon ? 'pl-10' : ''}`}
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
              className={`w-full p-3 text-white bg-[#1c102b] rounded-lg outline-none ${Icon ? 'pl-10' : ''}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;

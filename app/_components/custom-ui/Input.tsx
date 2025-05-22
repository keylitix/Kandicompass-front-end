// import React from 'react';

// interface InputProps {
//   label: string;
//   type: string;
//   name?: string;
//   value?: string | number;
//   onChange?: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => void;
//   readOnly?: boolean;
//   placeholder?: string;
//   additionalStyles?: string;
//   rows?: number;
//   cols?: number;
// }

// const Input: React.FC<InputProps> = ({
//   label,
//   type,
//   name,
//   value,
//   onChange,
//   readOnly = false,
//   placeholder = '',
//   additionalStyles = '',
//   rows = 4,
//   cols = 50,
// }) => {
//   return (
//     <div className="mb-6">
//       <label className="block text-white mb-2" htmlFor={name}>
//         {label}
//       </label>
//       {type === 'textarea' ? (
//         <textarea
//           id={name}
//           value={value}
//           onChange={onChange}
//           readOnly={readOnly}
//           placeholder={placeholder}
//           rows={rows}
//           cols={cols}
//           className={`w-full p-3 text-white bg-transparent border-2 border-transparent ${additionalStyles}`}
//           style={{
//             borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
//             outline: 'none',
//           }}
//         />
//       ) : (
//         <input
//           id={name}
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           readOnly={readOnly}
//           placeholder={placeholder}
//           className={`w-full p-3 text-white bg-transparent border-2 border-transparent ${additionalStyles}`}
//           style={{
//             borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
//             outline: 'none',
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Input;

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
  icon: Icon, // aliasing LucideIcon as Icon
}) => {
  const inputBaseClasses =
    'w-full p-3 text-white bg-transparent border-2 border-transparent pl-10'; // pl-10 gives room for the icon
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
            rows={rows}
            cols={cols}
            className={`${inputBaseClasses} ${additionalStyles}`}
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
            className={`${inputBaseClasses} ${additionalStyles}`}
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


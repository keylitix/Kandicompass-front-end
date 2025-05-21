import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React from 'react';

interface SelectProps {
  label: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  readOnly?: boolean;
  placeholder?: string;
  additionalStyles?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  readOnly = false,
  placeholder = 'Select an option',
  additionalStyles = '',
}) => {
  return (
    <div className="mb-6">
      <label className="block text-white mb-2" htmlFor={name}>
        {label}
      </label>
      <Select
        value={String(value)}
        name={name}
        onValueChange={(selectedValue) => {
          onChange?.({
            target: { name, value: selectedValue },
          } as React.ChangeEvent<HTMLSelectElement>);
        }}
        disabled={readOnly}
      >
        <SelectTrigger
          className={`w-full p-6 text-white bg-transparent border-2 border-transparent ${additionalStyles}`}
          style={{
            borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
            outline: 'none',
            color: 'white',
          }}
        >
          <SelectValue placeholder={placeholder} className="text-white" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;

import React, { useEffect, useMemo, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import countries from '../../data/country-picker.json'; // Assuming you have a JSON file with country data

interface Country {
    name: string;
    code: string;
    flag: string;
    dial_code: string;
}

interface InputProps {
    label: string;
    type: string;
    name?: string;
    value?: string;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    readOnly?: boolean;
    placeholder?: string;
    additionalStyles?: string;
    rows?: number;
    cols?: number;
    icon?: LucideIcon;
    onBlur?: any;
}
const PhoneInput: React.FC<InputProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    readOnly = false,
    placeholder = '',
    additionalStyles = '',
    icon: Icon,
    onBlur,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find((c) => c.code === 'US') || countries[0]);
    const [countryCode, setCountryCode] = useState<string>(selectedCountry.dial_code);
    const [inputVal, setInputVal] = useState<string>(value || '');

    function getPhoneNumberFromNumberString(numberString: string): string {
        if (typeof numberString !== 'string') {
            return '';
        }

        const firstSpaceIndex = numberString.indexOf(' ');
        if (firstSpaceIndex === -1) {
            return ''; // No space, no phone number part
        }

        return numberString.slice(firstSpaceIndex + 1).trim();
    }


    useEffect(() => {
        if (value) {
            const dialCode = value.split(' ')[0];
            const country = countries.find(c => c.dial_code === dialCode);
            if (country) {
                setSelectedCountry(country);
                setCountryCode(country.dial_code);
                setInputVal(value.slice(dialCode.length + 1)); // number part only
            }
        }
    }, [value]);


    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setCountryCode(country.dial_code);
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: country.dial_code + (inputVal?.replace(/^\+?[0-9]*/, '') ?? ''),
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-white mb-1 text-sm font-medium" htmlFor={name}>
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {Icon && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 text-white">
                        <Icon size={16} />
                    </div>
                )}

                <div
                    className={`flex items-center gap-[2px] w-full rounded-lg p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF]  ${additionalStyles}`}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 w-[100px] h-[47px] rounded-l-lg bg-[#1c102b] text-white text-sm focus:outline-none focus:ring-0 "
                            >
                                <img
                                    src={`https://flagcdn.com/16x12/${selectedCountry.code.toLocaleLowerCase()}.webp`}
                                    width="16"
                                    height="12"
                                    alt={selectedCountry.name}
                                />
                                <span>{selectedCountry.dial_code}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-h-[300px] overflow-auto">
                            {countries.map((country) => (
                                <DropdownMenuItem
                                    key={country.code}
                                    onSelect={() => handleCountryChange(country)}
                                >
                                    <img
                                        src={`https://flagcdn.com/16x12/${country.code.toLocaleLowerCase()}.webp`}
                                        width="16"
                                        height="12"
                                        alt={country.name}
                                    />

                                    {country.name} ({country.dial_code})
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <input
                        id={name}
                        type={type}
                        name={name}
                        value={inputVal}
                        onChange={(e) => {
                            const newNumber = e.target.value;
                            setInputVal(newNumber);

                            if (onChange) {
                                onChange({
                                    target: {
                                        name,
                                        value: `${selectedCountry.dial_code} ${newNumber}`,
                                    },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }
                        }}
                        onBlur={onBlur}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className="flex-1 p-3 text-white bg-[#1c102b] rounded-r-lg outline-none"
                    />

                </div>
            </div>
        </div>
    );
};

export default PhoneInput;

'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
    onClick: (value: string) => void;
    icon: IconType;
    label: string;
    selected?: boolean;
    disabled?: boolean;
}
const CategoryInput: React.FC<CategoryInputProps> = ({ onClick, icon: Icon, label, selected, disabled }) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
            ${disabled && 'opacity-50 cursor-default'}
            `}
        >
            <Icon size={30} />
            <div className="font-semibold text-lg">{label}</div>
        </div>
    );
};

export default CategoryInput;

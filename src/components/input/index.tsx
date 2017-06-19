import * as React from 'react';
import './input-style.css';

interface InputProps {
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
}

const getValue = (e: React.FormEvent): string => {
    const target = e.target as HTMLInputElement;
    return target.value.trim();
};

const Input: React.SFC<InputProps> = props => {
    return (
        <div className="input__wrapper">
            <input
                className="input__element"
                type="text"
                placeholder={props.placeholder}
                onChange={(e: React.FormEvent) => props.onChange(getValue(e))}
                value={props.value}
            />
            {props.children}
        </div>
    );
};

export default Input;

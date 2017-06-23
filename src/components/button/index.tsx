import * as React from 'react';
import './button-style.css';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    // workaround from https://github.com/Microsoft/TypeScript/issues/13618
    children?: React.ReactNode;
}

const Button: React.SFC<ButtonProps> = props => {
    return (
        <button
            className="button"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;

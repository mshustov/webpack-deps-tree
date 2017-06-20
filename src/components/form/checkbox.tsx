import * as React from 'react';

interface CheckboxProps {
    checked: boolean;
    disabled?: boolean;
    name: string;
    onChange: (e: React.FormEvent) => void;
    children?: React.ReactNode;
}

const Checkbox: React.SFC<CheckboxProps> = props => (
     <label className="checkbox">
        <input
            className="checkbox__element"
            checked={props.checked}
            disabled={props.disabled}
            name={props.name}
            onClick={props.onChange}
            type="checkbox"
        />
        {props.children && <span className="checkbox__text">{props.children}</span>}
    </label>
);

export default Checkbox;

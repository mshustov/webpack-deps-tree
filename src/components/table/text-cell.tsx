import * as React from 'react';
import { Cell } from 'fixed-data-table-2';

const noop = () => ({});

export interface TextCellProps {
    rowIndex?: number; // will be injected by 'fixed-data-table'
    data: Module[];
    col: keyof Module;
    onClick?: (id: ModuleId) => void; // FIXME the same shit. we shouldn't know what's inside
}

const TextCell: React.SFC<TextCellProps> = props => {
    const { rowIndex, data, col, onClick, ...otherProps } = props;
    const module = data[rowIndex];

    const clickHandler = onClick || noop;
    return (
        <Cell {...otherProps} onClick={() => clickHandler(module.uid)}>
            {module[col]}
        </Cell>
    );
};

export default TextCell;

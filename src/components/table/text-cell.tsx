import * as React from 'react';
import { Cell } from 'fixed-data-table-2';
import classnames from 'classnames';
import './table-style.css';

export interface TextCellProps {
    rowIndex?: number; // will be injected by 'fixed-data-table'
    data: Module[];
    col: keyof Module;
    onClick?: (id: ModuleId) => void;
}

const TextCell: React.SFC<TextCellProps> = props => {
    const { rowIndex, data, col, onClick, ...otherProps } = props;
    const module = data[rowIndex];

    const cellClassnames = classnames('table__cell', {
        'table__cell--clickable': Boolean(onClick)
    });

    return (
        <Cell
            {...otherProps}
            className={cellClassnames}
            onClick={onClick ? () => onClick(module.uid) : undefined}
        >
            {module[col]}
        </Cell>
    );
};

export default TextCell;

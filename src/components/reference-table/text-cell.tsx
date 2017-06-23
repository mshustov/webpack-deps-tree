import * as React from 'react';
import classnames from 'classnames';
import { Cell } from 'fixed-data-table-2';
import './reference-table-style.css';

export interface TextCellProps {
    rowIndex?: number; // will be injected by 'fixed-data-table'
    data: Module;
    col: keyof Module;
    onClick?: (id: ModuleId) => void;
}

const TextCell: React.SFC<TextCellProps> = props => {
    const { rowIndex, data, col, onClick, ...cleanProps } = props;
    const value = data[col][rowIndex];

    const cellClassnames = classnames('reference-table__cell', {
        'reference-table__cell--clickable': Boolean(onClick)
    });

    return (
        value ?
            <Cell
                {...cleanProps}
                className={cellClassnames}
                onClick={onClick ? () => onClick(value.moduleUid) : undefined}
            >
                {value.moduleName}
            </Cell> :
            null
    );
};

export default TextCell;

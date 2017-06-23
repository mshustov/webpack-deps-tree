import * as React from 'react';
import { Cell } from 'fixed-data-table-2';

import { SortDir, SortTypes } from './sort-types';

function reverseSortDirection(sortDir: SortDir): SortDir {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

export interface SortHeaderCellProps {
    columnKey?: string; // will be injected by 'fixed-data-table'
    sortDir?: SortDir;
    onSortChange?: (columnKey: string, sortDir: SortDir) => void;
}

class SortHeaderCell extends React.Component<SortHeaderCellProps, {}> {
    constructor(props: SortHeaderCellProps) {
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
    }

    _onSortChange(e: React.MouseEvent) {
        e.preventDefault();

        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.props.sortDir ?
                    reverseSortDirection(this.props.sortDir) :
                    SortTypes.DESC
            );
        }
    }

    render() {
        var { sortDir, children, onSortChange, ...props } = this.props;
        const sortingLabel = sortDir ? (sortDir === SortTypes.DESC ? '↑' : '↓') : '';
        return (
            <Cell {...props}>
                <a onClick={this._onSortChange}>
                    {children} {sortingLabel}
                </a>
            </Cell>
        );
    }
}

export default SortHeaderCell;

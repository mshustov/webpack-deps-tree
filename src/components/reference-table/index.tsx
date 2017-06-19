import * as React from 'react';

import ReferenceTable from './table';
import './reference-table-style.css';

interface ReferenceTableWrapperProps {
    module: Module | null;
    onSelect: (moduleId: ModuleId) => void;
}

const ReferenceTableWrapper: React.SFC<ReferenceTableWrapperProps> = props => {
    if (!props.module) {
        return (
            <div className="reference-table reference-table--empty">
                <span className="reference-table__title">
                    No module was selected
                </span>
            </div>
        );
    }

    const rowsCount = Math.max(props.module.reasons.length, props.module.dependencies.length);

    return (
        <div className="reference-table">
            <div className="reference-table__title">
                Active module: {props.module.name}
            </div>
            <ReferenceTable
                rowsCount={rowsCount}
                {...props}
            />
        </div>
    );
};

export default ReferenceTableWrapper;

import * as React from 'react';
import Dimensions from 'react-dimensions';
import { Table, Column, Cell } from 'fixed-data-table-2';

import TextCell from './text-cell';
import './reference-table-style.css';

interface ReferenceTableProps {
    rowsCount: number;
    containerWidth: number; // injected by react-dimension
    containerHeight: number; // injected by react-dimension
    module: Module | null;
    onSelect: (moduleId: ModuleId) => void;
}

// we use class since react-dimension uses refs
class ReferenceTable extends React.Component<ReferenceTableProps, {}> {
    render () {
        return (
            <Table
                className="reference-table__element"
                rowHeight={30}
                rowsCount={this.props.rowsCount}
                headerHeight={50}
                width={this.props.containerWidth}
                height={this.props.containerHeight}
            >
                <Column
                    columnKey="reasons"
                    header={<Cell>Required from</Cell>}
                    cell={
                        <TextCell
                            data={this.props.module}
                            col="reasons"
                            onClick={this.props.onSelect}
                        />
                    }
                    fixed={true}
                    flexGrow={1}
                    width={200}
                />
                <Column
                    columnKey="dependencies"
                    header={<Cell>Requires</Cell>}
                    cell={
                        <TextCell
                            data={this.props.module}
                            col="dependencies"
                            onClick={this.props.onSelect}
                        />
                    }
                    fixed={true}
                    flexGrow={1}
                    width={200}
                />
            </Table>
        );
    }
}

export default Dimensions({
    getHeight: function(elem: HTMLElement) {
        return elem.offsetHeight;
    },
    getWidth: function(elem: HTMLElement) {
        return elem.offsetWidth;
    }
})(ReferenceTable);

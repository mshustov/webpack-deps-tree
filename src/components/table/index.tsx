import * as React from 'react';

import { SortType, SortTypes } from './sort-types';

// FIXME how to separate types from values here?
import Input from '../input/';
import ModuleTable from './table';

import './table-style.css';

interface ModulesTableProps {
    modules: Module[];
    // FIXME we shouldn't write it every time manually. should we?
    onSelect: (moduleId: ModuleId) => void;
}

interface ModulesTableState {
    filteredDataList: Module[];
    colSortDirs: { [key: string]: SortType };
}

class ModuleTableWrapper extends React.Component<ModulesTableProps, ModulesTableState> {
    _dataList: Module[];
    constructor(props: ModulesTableProps) {
        super(props);

        this._dataList = props.modules;
        this.state = {
            filteredDataList: this._dataList,
            colSortDirs: {}
        };

        this._onFilterChange = this._onFilterChange.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
    }

    _onFilterChange(value: string) {
        const filterBy = value.toLowerCase();
        if (!filterBy) {
            this.setState((prevState, props) => {
                return { ...prevState, filteredDataList: this._dataList };
            });
        }

        // CHECK regexp
        const filteredDataList = this._dataList.filter(m => m.name.toLowerCase().indexOf(filterBy) !== -1);

        this.setState((prevState, props) => {
            return { ...prevState, filteredDataList: filteredDataList };
        });
    }

    _onSortChange(columnKey: string, sortDir: SortType): void {
        const sortedList = this.state.filteredDataList.sort((moduleA, moduleB) => {
            const valueA = moduleA[columnKey];
            const valueB = moduleB[columnKey];
            let sortVal = 0;
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
            if (sortVal !== 0 && sortDir === SortTypes.ASC) {
                sortVal = sortVal * -1;
            }

            return sortVal;
        });

        this.setState((prevState, props) => {
            return {
                ...prevState,
                sortedDataList: sortedList,
                colSortDirs: { [columnKey]: sortDir }
            };
        });
    }

    render() {
        const { filteredDataList, colSortDirs } = this.state;

        return (
            <div className="table">
                <div className="table__filter">
                    <Input
                        onChange={this._onFilterChange}
                        placeholder="Filter by module name"
                    />
                </div>
                <ModuleTable
                    colSortDirs={colSortDirs}
                    modules={filteredDataList}
                    onSelect={this.props.onSelect}
                    onSortChange={this._onSortChange}
                />
            </div>
        );
    }
}

export default ModuleTableWrapper;

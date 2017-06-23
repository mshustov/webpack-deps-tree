import * as React from 'react';
import orderBy from 'lodash/orderBy';

import { SortDir, SortTypes, SortKey, SortingOrder } from './sort-types';

import Input from '../input/';
import ModuleTable from './table';

import './table-style.css';

interface ModulesTableProps {
    modules: Module[];
    onSelect: (moduleId: ModuleId) => void;
}

interface ModulesTableState {
    filteredDataList: Module[];
    colSortDirs: SortingOrder;
}

const defaultSort: SortKey = 'name';
const defaultSortDirection: SortDir = SortTypes.ASC;

class ModuleTableWrapper extends React.Component<ModulesTableProps, ModulesTableState> {
    _dataList: Module[];

    static sortDataList(modules: Module[], columnKey: SortKey, sortDir: SortDir): Module[] {
        return orderBy(modules, columnKey, sortDir);
    }

    constructor(props: ModulesTableProps) {
        super(props);

        this._dataList = props.modules;
        this.state = {
            filteredDataList: this._dataList,
            colSortDirs: {
                key: defaultSort,
                direction: defaultSortDirection
            }
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

        // TODO: regexp
        const filteredDataList = this._dataList.filter(m => m.name.toLowerCase().indexOf(filterBy) !== -1);

        this.setState((prevState, props) => {
            return { ...prevState, filteredDataList: filteredDataList };
        });
    }

    _onSortChange(sortKey: SortKey, sortDir: SortDir): void {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                sortedDataList: ModuleTableWrapper.sortDataList(
                    this.state.filteredDataList,
                    sortKey,
                    sortDir
                ),
                colSortDirs: {
                    key: sortKey,
                    direction: sortDir
                }
            };
        });
    }

    render() {
        const { filteredDataList, colSortDirs } = this.state;
        const modules = ModuleTableWrapper.sortDataList(
            this.state.filteredDataList,
            colSortDirs.key,
            colSortDirs.direction
        );

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
                    modules={modules}
                    onSelect={this.props.onSelect}
                    onSortChange={this._onSortChange}
                />
            </div>
        );
    }
}

export default ModuleTableWrapper;

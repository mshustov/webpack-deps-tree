import * as React from 'react';

import Table from '../table/';
import ReferenceTable from '../reference-table/';

import OverviewSelect from '../overview-control/select';
import OverviewButton from '../overview-control/button';
import Graph from '../graph/';

import './app-style.css';

interface AppProps {
    nodes: ModuleNode[];
    edges: ModuleEdge[];

    modules: Module[];
    groups: {[key: string]: ModuleGroup};
    activeModule: Module | null;
    activeModuleId: ModuleId | null;
    activeGroupId: string;
    isModuleOverview: boolean;

    onSelect(name: string, value: string): void;
    onReset(): void;
}

const App = (props: AppProps) => (
    <div className="container">
        <div className="container__graph">
            <Graph
                nodes={props.nodes}
                edges={props.edges}

                activeModuleId={props.activeModuleId}
                isModuleOverview={props.isModuleOverview}

                onModuleSelect={(v) => props.onSelect('module', v)}
                onGroupSelect={(v) => props.onSelect('group', v)}
            >
                <OverviewSelect
                    groups={props.groups}
                    active={props.activeGroupId}
                    onChange={(v) => props.onSelect('group', v)}
                />
                <OverviewButton
                    disabled={props.isModuleOverview}
                    onClick={props.onReset}
                />
            </Graph>
        </div>
        <div className="container__controls">
            <div className="container__control-list">
                <Table
                    modules={props.modules}
                    onSelect={(v) => props.onSelect('module', v)}
                />
                <ReferenceTable
                    module={props.activeModule}
                    onSelect={(v) => props.onSelect('module', v)}
                />
            </div>
        </div>
    </div>
);

export default App;

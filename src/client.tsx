import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import * as url from 'url';
import processData from './utils/process-data';

import App from './components/app/app';

import { filterData } from './utils/filter';

const history = createHistory();

interface Store {
    module: string;
    group: string;
}

const defStore: Store = {
    module: '',
    group: ''
};

function onSelect(name: string, value: string): void {
    const current = new URL(window.location.href);
    const store = Object.assign({}, defStore, { [name]: value });
    Object.entries(store).forEach(([key, val]) => current.searchParams.set(key, val));

    history.push({
        pathname: current.pathname,
        search: current.search
    });
}

function onReset(): void {
    history.push({ pathname: window.location.pathname });
}

interface FilterModulesProps {
    activeModuleId: ModuleId;
    activeGroupId: string;
    isModuleOverview: boolean;
    modules: Module[];
    getModuleById: GetModuleById;
}

function run (rawData) {
    const { groups, edges, modules, getModuleById } = processData(rawData);

    function render(store: Store) {
        const activeModuleId = store.module;
        const module = activeModuleId ? getModuleById(activeModuleId) : null;
        const activeGroupId = store.group;
        const isModuleOverview = !activeModuleId && !activeGroupId;

        const filteredData = filterData(modules, edges, {
            modules,
            activeModuleId,
            activeGroupId,
            isModuleOverview,
            getModuleById
        });

        ReactDOM.render(
            <App
                nodes={filteredData.nodes}
                edges={filteredData.edges}

                groups={groups}
                modules={modules}
                activeModule={module}
                activeModuleId={activeModuleId}
                activeGroupId={activeGroupId}
                isModuleOverview={isModuleOverview}

                onSelect={onSelect}
                onReset={onReset}
            />,
            document.getElementById('root')
        );
    }

    function locationChangeHandler() {
        var { query } = url.parse(window.location.search, true);
        render(query);
    }

    history.listen(locationChangeHandler);

    render(defStore);
}

export default run;

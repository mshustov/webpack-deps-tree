import buildNetwork from './network';
import { getHighlightedPathByIdShort, getHighlightedPathById } from './search';

interface FilterModulesProps {
    activeModuleId: ModuleId;
    activeGroupId: string;
    isModuleOverview: boolean;

    modules: Module[];
    getModuleById: GetModuleById;
}

export function filterData(
    nodes: Module[],
    edges: ModuleEdge[],
    props: FilterModulesProps
): {nodes: ModuleNode[], edges: ModuleEdge[]} {
    if (props.isModuleOverview) {
        return buildNetwork(nodes, edges);
    }

    const filteredModuleIds = filterModules(props);

    return {
        nodes: nodes.filter(node => filteredModuleIds.includes(node.uid)),
        edges: edges.filter(edge =>
            filteredModuleIds.includes(edge.source.uid) && filteredModuleIds.includes(edge.target.uid)
        )
    };
}

function filterModules(props: FilterModulesProps): ModuleId[] {
    if (props.activeModuleId) {
        return filterByModuleId(props.activeModuleId, props.getModuleById);
    } else if (props.activeGroupId) {
        return filterByGroup(props.activeGroupId, props.modules, props.getModuleById);
    }
}

function filterByModuleId(id: ModuleId, getModuleById: GetModuleById): ModuleId[] {
    const module = getModuleById(id);

    const shortForm = module.group.is3rdPartyLibrary;

    const fn = shortForm ? getHighlightedPathByIdShort : getHighlightedPathById;
    let highlightedNodes = fn(id, getModuleById);

    return highlightedNodes;
}

function filterByGroup(name: string, modules: Module[], getModuleById: GetModuleById): ModuleId[] {
    var temp = modules
        .filter(m => name === m.group.name)
        .map(m => {
            const shouldUseChidlrenFilter = m.group.is3rdPartyLibrary;
            if (m.reasons.length) {
                const externals = m.reasons
                    .filter(r => shouldUseChidlrenFilter ? r.isExternalModule : true)
                    .map(r => r.moduleUid);

                if (externals.length) {
                    return [m.uid, ...externals];
                }
            }
        })
        .filter(Boolean)
        .reduce(
            (acc, highlightedNodes) => {
                highlightedNodes.forEach(acc.add, acc);
                return acc;
            },
            new Set()
        );

    return Array.from(temp);
}

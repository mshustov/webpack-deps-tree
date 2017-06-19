// http://bl.ocks.org/GerHobbelt/3071239
const getGroup = (i: Module): string => i.group.name;

// constructs the network to visualize
// TODO rename subgroup
function network(dataNodes: Module[], dataEdges: ModuleEdge[]): {nodes: ModuleOverview[], edges: ModuleEdge[]} {
    const nodes = [];
    const groupMap = {};
    const linksMap: {[key: string]: ModuleEdge} = {};

    for (let k = 0; k < dataNodes.length; ++k) {
        const n = dataNodes[k];
        const i = getGroup(n);

        if (!groupMap[i]) {
            groupMap[i] = {
                uid: i,
                nodeIndex: nodes.length,
                name: i,
                size: n.group.size,
                // chunks: new Set(),
                linkCount: 0
            };
            nodes.push(groupMap[i]);
        }
        // groupMap[i].chunks.add(...n.chunks);
    }

    for (let i = 0; i < dataEdges.length; ++i) {
        const edge = dataEdges[i];
        const sourceIdentifier = getGroup(edge.source);
        const targetIdentifier = getGroup(edge.target);

        // ignore internal connections
        if (sourceIdentifier === targetIdentifier) {
            continue;
        }

        const sourceLocalId = groupMap[sourceIdentifier].nodeIndex;
        const targetLocalId = groupMap[targetIdentifier].nodeIndex;

        // don't count external links
        if (sourceLocalId !== targetLocalId) {
            nodes[sourceLocalId].linkCount++;
            nodes[targetLocalId].linkCount++;
        }

        const id = sourceLocalId < targetLocalId ?
            sourceLocalId + '|' + targetLocalId :
            targetLocalId + '|' + sourceLocalId;

        if (!linksMap[id]) {
            linksMap[id] = {
                source: sourceLocalId,
                target: targetLocalId,
                id: id
            };
        }
    }

    return { nodes, edges: Object.values(linksMap) };
}

export default network;

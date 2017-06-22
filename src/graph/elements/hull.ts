const d3 = require('d3');

const offset = 15;
const curve = d3.svg.line().interpolate('cardinal-closed').tension(0.85);
const drawCluster = d =>  curve(d.path);
const getGroup = (i: Module): string => i.group.name;

// move me from here
function buildHulls(nodes) {
    var hulls = {};
    // create point sets
    for (var k = 0; k < nodes.length; ++k) {
        var n = nodes[k];

        var i = getGroup(n);
        var l = hulls[i] || (hulls[i] = []);

        // when node without any connections - ignore it
        if (n.weight) {
            l.push([n.x - offset, n.y - offset]);
            l.push([n.x - offset, n.y + offset]);
            l.push([n.x + offset, n.y - offset]);
            l.push([n.x + offset, n.y + offset]);
        }
    }

    return hulls;
}

function groupNodes(nodes) {
    const hulls = buildHulls(nodes);

    return Object.entries(hulls).map(([key, value]) => ({ group: key, path: d3.geom.hull(value) }));
}

export default function reInitilizeHull(options) {
    options.parent.selectAll('path.hull').remove();

    const hull = options.parent
        .selectAll('path.hull')
        .data(groupNodes(options.nodes))
        .enter()
        .append('path')
        .attr('class', 'hull')
        .attr('d', drawCluster)
        .style('fill', options.fill);

    function updateHullPosition() {
        if (!hull.empty()) {
            hull.data(groupNodes(options.nodes)).attr('d', drawCluster);
        }
    }

    return updateHullPosition;
}

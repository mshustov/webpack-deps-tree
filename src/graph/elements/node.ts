import { configureNodeDrag } from '../../utils/graph/control';

export default function reInitilizeNode({ parent, data, key, tick, fill, config }) {
    const node = parent.selectAll('circle.node').data(data, key);

    node.exit().remove();

    node
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('r', function(d: d3ForceItem) {
            // could be an object in case of module and number (as size) in case of module
            return Math.max(
                (d.linkCount ? Math.log2(d.size) : 0), // FIXME: d.linkCount as distinguish
                config.node.radius
            );
        })
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .call(configureNodeDrag(tick));

    node.style('fill', fill);

    // boundaries https://gist.github.com/mbostock/1129492 , https://bl.ocks.org/mbostock/1129492
    function updateNodePosition(e: d3ForceEvent) {
        node
            .attr('cx', d => {
                if (d.x < -config.svg.xBound) {
                    return d.x = Math.max(config.node.radius, d.x + 500 * e.alpha);
                } else if (d.x > config.svg.xBound) {
                    return d.x = Math.min(config.svg.xBound, d.x - 500 * e.alpha);
                }

                return d.x;
            })
            .attr('cy', d => {
                if (d.y < -config.svg.yBound) {
                    return d.y = Math.max(config.node.radius, d.y + 500 * e.alpha);
                } else if (d.y > config.svg.yBound) {
                    return d.y = Math.min(config.svg.yBound, d.y - 500 * e.alpha);
                }

                return d.y;
            });
    }

    return updateNodePosition;
}

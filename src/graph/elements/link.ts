export default function reInitilizeLinks({ parent, data, key }) {
    const link = parent.selectAll('line.link').data(data, key);
    const arrow = parent.selectAll('marker').data(data);

    arrow
        .enter()
        .append('marker')
        .attr('class', 'arrow')
        .attr('id', d => `marker-${d.uid}`)
        .attr('viewBox', '0 -2 4 4')
        .attr('refX', 8)
        .attr('refY', -0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-2L4,0L0,2');

    link.exit().remove();

    link
        .enter()
        .append('line')
        .attr('class', d => {
            var classStr = [
                'link',
                d.async && 'dashed'
            ].filter(Boolean).join(' ');

            return classStr;
        })
        .attr('x1', d => {
            return d.source.x;
        })
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .style('stroke-width', d => 1)
        .attr('marker-end', d => `url(#marker-${d.uid})`);

    function updateLinkPosition() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
    }

    return updateLinkPosition;
}

const transform = d => `translate(${d.x}, ${d.y})`;

export default function reInitilizeText({ parent, data, key, config }){
    const text = parent.selectAll('text.text').data(data, key);

    text.exit().remove();

    text
      .enter()
      .append('text')
        .attr('class', 'text')
        .attr('x', config.node.radius + 2)
        .attr('y', config.node.radius * 0.75)
        .text(d => d.name);

    function updateTextPosition() {
        text.attr('transform', transform);
    }

    return updateTextPosition;
}

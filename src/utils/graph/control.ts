const d3 = require('d3');

// custom dnd to prevent problems with zooming
// drag over zoom https://bl.ocks.org/mbostock/6123708
function dragstart(d) {
    d3.event.sourceEvent.stopPropagation();
}

function dragmove(tick: () => void, d) {
    d.px += d3.event.dx;
    d.py += d3.event.dy;
    d.x += d3.event.dx;
    d.y += d3.event.dy;

    tick();
}

export function configureNodeDrag(tick: () => void) {
    return d3.behavior.drag()
        .on('dragstart', dragstart)
        .on('drag', d => dragmove(tick, d));
}

const minZoom = 0.2;
const maxZoom = 1;
const zoom = d3.behavior.zoom().scaleExtent([minZoom, maxZoom]);

export function cofigureZoom({ frame, target }) {
    zoom.on('zoom', function() {
        frame.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    });

    target.call(zoom)
        .on('dblclick.zoom', null); // doesn't work if add above
}

// http://bl.ocks.org/TWiStErRob/b1c62730e01fe33baa2dea0d0aa29359
// fit in with resize https://jsfiddle.net/adityap16/11edxrnq/1/
export function configureZoomFit(target){
    return function zoomFit(transitionDuration = 0) {
        return zoom.scale(0.5);
        // const node = target.node();
        // const bounds = node.getBBox();
        // const parent = node.parentElement;
        // const fullWidth = parent.clientWidth || parent.parentNode.clientWidth;
        // const fullHeight = parent.clientHeight || parent.parentNode.clientHeight;
        // const currentWidth = bounds.width;
        // const currentHeight = bounds.height;
        // const midX = bounds.x + currentWidth / 2,
        //     midY = bounds.y + currentHeight / 2;

        // // nothing to fit
        // if (!currentWidth || !currentHeight) {
        //     return;
        // }

        // const scale = 0.85 / Math.max(currentWidth / fullWidth, currentHeight / fullHeight);
        // const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

        // target
        //     .transition()
        //     .duration(transitionDuration) // milliseconds
        //     .call(zoom.translate(translate).scale(scale).event);
    };
}

// resize implementation
// http://bl.ocks.org/eyaler/10586116
export function resize({ target, force, offsetRight }) {
    const currentWidth = window.innerWidth - offsetRight;
    const currentHeight = window.innerHeight;

    target.attr('width', currentWidth).attr('height', currentHeight);

    // force.size([currentWidth / zoom.scale(), currentHeight / zoom.scale()]).resume();
}

// http://bl.ocks.org/altocumulus/32ab2bd41ec092f8a233dbefe37742e3
export function stopForce(target) {
    target.stop();
}

const sustainKoeff = 0.01; // sustain dead val
export function speedUpForce(target) {
    var safetyGuard = 0;
    while (target.alpha() > sustainKoeff) {
        target.tick();
        if (safetyGuard++ > 200) {
            break;
        }
    }
}

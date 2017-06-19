import * as React from 'react';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

// that's kludge since typings for d3@v3 are outdated
const d3 = require('d3');

import './graph-style.css';

import {
    configureZoomFit,
    cofigureZoom,
    resize
} from '../utils/graph/control';

const getIndex = i => i.name;
const getGroup = (i: Module): string => i.group.name;

import reInitilizeLinks from './elements/link';
import reInitilizeText from './elements/text';
import reInitilizeNode from './elements/node';
import reInitilizeHull from './elements/hull';

const config = {
    svg: {
        width: 500,
        height: 500,
        offsetRight: 500,
        xBound: 3000,
        yBound: 3000
    },
    node: {
        radius: 4,
        activeColor: 'red'
    },

};

// add prefix for group for simplifying sorting
const nodeid = (d: d3ForceItem): string => d.uid;

function linkid(l: d3Force) {
    const u = nodeid(l.source);
    const v = nodeid(l.target);

    return u < v ? u + '|' + v : v + '|' + u;
}

interface GraphProps {
    nodes: Module[];
    edges: ModuleEdge[];
    // groups: {[key: string]: ModuleGroup};

    activeModuleId: ModuleId;
    isModuleOverview: boolean;
}

// TODO add return interfaces
export function bootstrap(root: HTMLElement) {
    let force;
    const fill = d3.scale.category20();

    const svg = d3.select(root).append('svg');
    const g = svg.append('g');

    // order matters for events
    const hullg = g.append('g');
    const linkg = g.append('g');
    const nodeg = g.append('g');
    const textg = g.append('g');

    const zoomFit = configureZoomFit(g);
    cofigureZoom({ frame: g, target: svg });

    function cleanFiltered() {
        g.selectAll('.fade').classed('fade', false);
    }

    function cleanHull() {
        hullg.selectAll('*').remove();
    }

    function updateFilter(value: string, isModuleOverview: boolean) {
        cleanFiltered();

        if (!value) {
            return;
        }

        const filterReg = new RegExp(value, 'i');

        // TODO: can we pass filter as data and just use declarative react-like approach?
        g.selectAll('.node')
            .filter(d => !filterReg.test(getIndex(d)))
            .classed('fade', true);

        g.selectAll('.text')
            .filter(d => !filterReg.test(getIndex(d)))
            .classed('fade', true);

        g.selectAll('.link')
            .filter(d => !(filterReg.test(getIndex(d.source)) && filterReg.test(getIndex(d.target))))
            .classed('fade', true);

        g.selectAll('.arrow')
            .filter(d => !(filterReg.test(getIndex(d.source)) && filterReg.test(getIndex(d.target))))
            .classed('fade', true);
    }

    function updateData(props: GraphProps) {
        if (props.isModuleOverview) {
            renderOverview(props);
        } else {
            render(props);
        }

        cleanFiltered();
    }

    function renderOverview(props: GraphProps) {
        cleanHull();
        const { nodes, edges, isModuleOverview, activeModuleId } = props;

        if (force) {
            force.stop();
        }

        force = d3.layout
            .force()
            .nodes(nodes)
            .links(edges)
            .size([config.svg.width, config.svg.height])
            // check
            // http://stackoverflow.com/questions/11894057/configure-fixed-layout-static-graph-in-d3-js
            // http://stackoverflow.com/questions/34355120/d3-js-linkstrength-influence-on-linkdistance-in-a-force-graph
            .linkDistance(function(l: d3Force, i: d3Force) {
                var n1 = l.source;
                var n2 = l.target;

                var sizeInfluence = Math.max(
                    Math.log2(n1.size),
                    Math.log2(n2.size),
                    1
                );

                var connectionsInfluence = n1.uid === n2.uid
                    ? 0
                    : Math.max(
                        Math.log2(n1.linkCount),
                        Math.log2(n2.linkCount),
                        0
                    );

                var long = 30 + Math.max(
                        Math.min(
                            20 * sizeInfluence,
                            -20 + 20 * connectionsInfluence
                        ),
                        100
                    );

                return long;
            })
            // understanding gravity http://bl.ocks.org/sathomas/191a8a302a363ac6a4b0
            // gravity+charge tweaked to ensure good 'grouped' view
            .gravity(0.05)
            .charge(n => -800 * Math.max(Math.log2(n.size), 1))
            .friction(0.2) //  also influnce groupping
            .on('tick', tick)
            .start();

        const updateNodePosition = reInitilizeNode({
            parent: nodeg,
            data: nodes,
            key: nodeid,
            // we need to control node drag.
            // since we also need to update hull position, so we pass the whole tick
            tick,
            fill(d: d3ForceItem) {
                return fill(d.uid);
            },
            config
            // ondblclick(d)
        });

        const updateLinkPosition = reInitilizeLinks({
            parent: linkg,
            data: edges,
            key: linkid
        });

        const updateTextPosition = reInitilizeText({
            parent: textg,
            data: nodes,
            key: nodeid,
            config
        });

        function tick(e: d3ForceEvent) {
            updateNodePosition(e);
            updateLinkPosition();
            updateTextPosition();
        }

        resize({ target: svg, force, offsetRight: config.svg.offsetRight });
    }

    function render(props: GraphProps) {
        const { nodes, edges, isModuleOverview, activeModuleId } = props;
        if (force) {
            force.stop();
        }

        const isModuleActive = (d): boolean => d.uid === activeModuleId;

        const net = { nodes, links: edges }; // network({ nodes, edges }, previousState, isNodeExpand);
        console.log('init module', net);

        force = d3.layout
            .force()
            .nodes(nodes)
            .links(edges)
            .size([config.svg.width, config.svg.height])
            // check 
            // http://stackoverflow.com/questions/11894057/configure-fixed-layout-static-graph-in-d3-js
            // http://stackoverflow.com/questions/34355120/d3-js-linkstrength-influence-on-linkdistance-in-a-force-graph
            .linkDistance(function(l: d3Force, i: d3Force) {
                const path1 = l.source.path;
                const path2 = l.target.path;
                const long = 5 * (90
                    - 30 * Number(path1[0] === path2[0])
                    - 20 * Number(path1[0] === path2[0])
                    - 10 * Number(path1[0] === path2[0])
                    // - 10 * (path1[3] === path2[3] ? 1 : 0)
                    // - 5  * (path1[4] === path2[4] ? 1 : 0)
                );

                return long;
            })
            // understanding gravity http://bl.ocks.org/sathomas/191a8a302a363ac6a4b0
            // gravity+charge tweaked to ensure good 'grouped' view
            .gravity(0)
            .charge(-900)
            .friction(0.5) // friction adjusted to get dampened display
            .on('tick', tick)
            .start();

        const updateHullPosition = reInitilizeHull({
            parent: hullg,
            nodes: nodes,
            fill(d: d3HullItem) {
                const group = d.group;
                return fill(group);
            }
        });

        const updateNodePosition = reInitilizeNode({
            parent: nodeg,
            data: nodes,
            key: nodeid,
            // we need to contol node drag.
            // since we also need to update hull position, so we pass the whole tick
            tick,
            fill(d: d3ForceItem) {
                return isModuleActive(d) ? config.node.activeColor : fill(getGroup(d));
            },
            config
        });

        const updateLinkPosition = reInitilizeLinks({
            parent: linkg,
            data: edges,
            key: linkid
        });

        const updateTextPosition = reInitilizeText({
            parent: textg,
            data: nodes,
            key: nodeid,
            config
        });

        function tick(e: d3ForceEvent) {
            updateNodePosition(e);
            updateLinkPosition();
            updateTextPosition();
            updateHullPosition();
        }

        resize({ target: svg, force, offsetRight: config.svg.offsetRight });
    }

    // pefrormance http://stackoverflow.com/questions/26188266/how-to-speed-up-the-force-layout-animation-in-d3-js
    zoomFit();

    return { updateData, updateFilter };
}

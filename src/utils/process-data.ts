import uniqBy from 'lodash/uniqBy';
import flow from 'lodash/flow';
const path = require('path');

function is3rdPartLibrary(moduleName: string): boolean {
    // FIXME won't work for webpack v3
    return moduleName.includes('~') || moduleName.includes('(webpack)');
}

function formatPathIden(targetId: ModuleId, sourceId: ModuleId): string {
    return `${targetId}-${sourceId}`;
}

function byId(a: WebpackModule, b: WebpackModule) {
    if (a.id > b.id) {
        return 1;
    }

    if (a.id < b.id) {
        return -1;
    }

    return 0;
}

function byReasonsCount(moduleA: Module, moduleB: Module) {
    return moduleB.reasonsCount - moduleA.reasonsCount;
}

const toFixed = (precision: number = 0) => (num: number) => num.toFixed(precision);
const toKb = (size: number) => size / 1024;

const castToKb = flow(toKb, toFixed(1), parseFloat);

function processData(stats: WebpackStat) {
    stats.assets.sort(function(a: WebpackAsset, b: WebpackAsset) {
        return b.size - a.size;
    });
    stats.modules.sort(byId);
    var mapModules = {};
    const mapGroup = {};

    const getModuleById: GetModuleById = id => mapModules[id];

    const isExternalModule = (moduleId: ModuleId, reasonId: ModuleId): boolean => {
        const module = getModuleById(moduleId);
        const reason = getModuleById(reasonId);
        return module.group.name !== reason.group.name;
    };

    // create module cache and normalise shape
    const modules: Module[] = stats.modules.map(function(module: WebpackModule, idx: number): Module {
        const uid = String(module.id);

        const modulePath = module.name.split(path.sep).slice(1); // get rid of .
        // CHECK: check, not sure if it works in the browser
        const indexNodeModules = modulePath.indexOf('~'); // use is3rdPartLibrary() instead

        const modulePathGroup = indexNodeModules === -1 ? modulePath : modulePath.slice(indexNodeModules + 1);
        let [groupName] = modulePathGroup;
        if (!groupName) {
            groupName = module.name;
        }

        mapGroup[groupName] = mapGroup[groupName] || {
            name: groupName,
            size: 0,
            count: 0,
            is3rdPartyLibrary: is3rdPartLibrary(module.name)
        };

        mapGroup[groupName].count += 1;
        mapGroup[groupName].size += module.size;

        const m = {
            uid,
            name: module.name,
            group: mapGroup[groupName],
            size: module.size,
            type: module.type,
            path: modulePathGroup,

            chunks: module.chunks.map(String),
            dependencies: [],
            reasons: [],
            reasonsCount: null
        };

        mapModules[m.uid] = m;

        return m;
    });

    // create chunk cache and normalise shape
    // var mapChunks = {};
    // stats.chunks = stats.chunks || [];

    // stats.chunks.forEach(function(chunk: WebpackChunk) {
    //     mapChunks[chunk.id] = chunk;
    //     ...
    // });

    // transform modules (reasons --> dependencies ...)
    modules.forEach(function(module: Module, idx: number) {
        var reasons = stats.modules[idx].reasons || [];

        var uniqueReasons = uniqBy(reasons, 'moduleId')
            .map(reason => ({
                moduleUid: String(reason.moduleId),
                moduleName: reason.moduleName,
                type: reason.type,
                isExternalModule: isExternalModule(module.uid, String(reason.moduleId))
            }));

        module.reasons = uniqueReasons;
        module.reasonsCount = uniqueReasons.length;

        uniqueReasons.forEach((r: Reason) => {
            var m = mapModules[r.moduleUid];
            if (!m) {
                return;
            }

            m.dependencies.push({
                moduleUid: module.uid,
                moduleName: module.name,
                type: module.type,
                isExternalModule: isExternalModule(module.uid, String(r.moduleUid))
            });
        });
    });

    var edges: ModuleEdge[] = [];
    modules.forEach(module => {
        const reasons = module.reasons;
        reasons.forEach(function(reason: Reason) {
            var parentModule = mapModules[reason.moduleUid];
            if (!parentModule) {
                return;
            }

            var async = !module.chunks.every(function(chunk: string): boolean {
                return parentModule.chunks.includes(chunk);
            });

            // borrowed from webpack-analyse
            // traverse and check belonging to parent(s) chunk

            // !module.chunks.some(function(chunk: string): boolean {
            //     return (function isInChunks(chunks: string[], checked: string[]) {
            //         if (chunks.length === 0) {
            //             return false;
            //         }

            //         if (chunks.indexOf(chunk) !== -1) {
            //             return true;
            //         }

            //         chunks = chunks.filter(function(c: string) {
            //             return checked.indexOf(c) === -1;
            //         });

            //         if (chunks.length === 0) {
            //             return false;
            //         }

            //         return chunks.some(function(c: string) {
            //             return isInChunks(mapChunks[c].parents, checked.concat(c));
            //         });
            //     }(parentModule.chunks, []));
            // });

            const edge: ModuleEdge = {
                id: formatPathIden(module.uid, parentModule.uid),
                source: mapModules[parentModule.uid],
                target: mapModules[module.uid],
                // async: false
            };
            edges.push(edge);
        });
    });
    const groups = Object.keys(mapGroup).sort((keyA, keyB) => mapGroup[keyB].size - mapGroup[keyA].size);

    Object.keys(mapGroup).forEach(key => {
        mapGroup[key].size = castToKb(mapGroup[key].size);
    });

    modules.sort(byReasonsCount);

    return {
        groups: mapGroup,
        modules: modules,
        edges,
        getModuleById
    };
}

export default processData;

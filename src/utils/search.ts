import { traverseBread } from './traverse';

export function getHighlightedPathByIdShort(startId: ModuleId, getModuleById: GetModuleById) {
    var highlightedNodes: ModuleId[] = [];
    traverseBread(
        startId,
        function visit(id: ModuleId): void{
            highlightedNodes.push(id);
        },
        function getChildren(id: ModuleId): ModuleId[]{
            var module = getModuleById(id);
            if (module.reasons.length) {
                const externals = module.reasons.filter(r => r.isExternalModule).map(r => r.moduleUid);
                highlightedNodes = highlightedNodes.concat(externals);

                const internals = module.reasons.filter(r => !r.isExternalModule).map(r => r.moduleUid);
                return internals;
            }
        }
    );

    return highlightedNodes;
}

export function getHighlightedPathById(startId: ModuleId, getModuleById: GetModuleById) {
    const highlightedNodes: ModuleId[] = [];
    traverseBread(
        startId,
        function visit(id: ModuleId): void{
            highlightedNodes.push(id);
        },
        function getChildren(id: ModuleId): ModuleId[]{
            var module = getModuleById(id);
            if (module.reasons.length) {
                const reasonIds = module.reasons.map(r => r.moduleUid);

                return reasonIds;
            }
        }
    );

    return highlightedNodes;
}

export function getHighlightedDepsById(startId: ModuleId, getModuleById: GetModuleById) {
    var highlightedNodes: ModuleId[] = [];
    traverseBread(
        startId,
        function visit(id: ModuleId): void{
            highlightedNodes.push(id);
        },
        function getChildren(id: ModuleId): ModuleId[]{
            var module = getModuleById(id);
            if (module.reasons.length) {
                const depsIds = module.dependencies
                    // .filter(dep => isExternalModule(id, dep.moduleId))
                    .filter(dep => dep.isExternalModule)
                    .map(dep => dep.moduleUid);

                return depsIds;
            }
        }
    );

    return highlightedNodes;
}

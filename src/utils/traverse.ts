export function traverseBread(
    startId: ModuleId,
    visit: (id: ModuleId) => void,
    getChildren: (id: ModuleId) => ModuleId[]
): void {
    var queue = [startId];
    var visited: {[key: string]: boolean} = {};

    while (queue.length) {
        var id = queue.shift();
        if (visited[id]) {
            continue;
        }

        visited[id] = true;

        visit(id);
        const children = getChildren(id);
        if (children) {
            queue = queue.concat(children);
        }
    }
}

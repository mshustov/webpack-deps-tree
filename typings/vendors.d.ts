type ModuleId = string;
type GetModuleById = (id: ModuleId) => Module;

interface Asset {
    name: string;
    size: number;
    chunks: number[];
    chunkNames: string[];
    emitted: boolean;

    // added later
    normalizedName: string;
}

interface Reason {
    moduleUid: string;
    moduleName: string;
    type: string;
    isExternalModule: boolean;
}

interface ModuleGroup {
    name: string;
    is3rdPartyLibrary: boolean;
    path: string;
    size: number;
}

interface Mdule {
    id: ModuleId;
    identifier: string;
    name: string;
    index: number;
    index2: number; // wtf?
    size: number;
    cacheable: boolean;
    built: boolean;
    optional: boolean;
    prefetched: boolean;
    chunks: number[];
    assets: Asset[];
    reasons: any[];
    issuer: string;
    issuerId: number;
    issuerName: string;
    type: string;
    failed: boolean;
    errors: number;
    warnings: number;
    usedExports: any; // null | string[]
    providedExports: any;
    depth: number;
    source: string;

    // added later
    uid: string;
    dependencies: any[]; // ?
    reasonsCount: number;
    isOwn: boolean;
    isDirect: boolean;
    group: ModuleGroup;
}

// TODO what it is?
interface Chunk {
    id: number;
    rendered: boolean;
    initial: boolean;
    entry: boolean;
    extraAsync: boolean;
    size: number;
    names: any; //[];
    files: any; // [extract-text-webpack-plugin-output-filename];
    hash: string;
    parents: any; // []
    origins: any //[]

    //added later
    children: number[];
}

declare interface Stat {
    assets: Asset[];
    character: number;
    modules: Mdule[];
    chunks: Chunk[]
}

declare interface Module {
    uid: string;
    group: ModuleGroup;
    size: number;
    type: string;
    name: string;
    path: string[];

    chunks: string[];
    dependencies: Reason[];
    reasons: Reason[];
    reasonsCount: number;
    linkCount?: number; // hack
}

declare interface ModuleOverview {
    uid: ModuleId;
    name: string;
    size: number;
    nodeIndex: number;
    linkCount: number;
}


type ModuleNode = Module | ModuleOverview;

declare interface ModuleEdge {
    id: string;
    source: Module;
    target: Module;
}

interface d3ForceItem extends Module {
    id: number;
    px: number;
    py: number;
    weight: number;
    x: number;
    y: number;
}

interface d3Force {
    size: number;
    source: d3ForceItem;
    target: d3ForceItem;
}

interface d3HullItem {
    group: string;
    path: any[];
}

interface d3ForceEvent {
    type: string;
    alpha: number;
}

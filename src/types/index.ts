export interface StoreState {
    nodes: Module[];
    extendedModuleInfoId: ModuleId;
    extendedModuleGroupId: string;
    moduleIdStack: ModuleId[];
    shortRenderedPathType: boolean;
}

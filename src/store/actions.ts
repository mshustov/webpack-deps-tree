// import { StoreState } from '../types/index'; // why index?

// export const MODULE_SET_UPDATED = 'MODULE_SET_UPDATED';
// export type MODULE_SET_UPDATED = typeof MODULE_SET_UPDATED;

// export interface UpdateModuleSet {
//     type: MODULE_SET_UPDATED;
//     nodes: Module[];
// }

// export function updateModuleSet(nodes: Module[]): UpdateModuleSet {
//     return {
//         type: MODULE_SET_UPDATED,
//         nodes
//     };
// }
// // -------------------------------------------------------------------------------------

// export const MODULE_EXTENDED_INFO_SELECTED = 'MODULE_EXTENDED_INFO_SELECTED';
// export type MODULE_EXTENDED_INFO_SELECTED = typeof MODULE_EXTENDED_INFO_SELECTED;

// // TODO rename
// export interface SelectModuleForExtendedInfo {
//     type: MODULE_EXTENDED_INFO_SELECTED;
//     moduleId: ModuleId;
// }

// export function selectModuleForExtendedInfo(moduleId: ModuleId): SelectModuleForExtendedInfo {
//     return {
//         type: MODULE_EXTENDED_INFO_SELECTED,
//         moduleId
//     };
// }
// // -------------------------------------------------------------------------------------

// export const MODULE_EXTENDED_INFO_SELECTED_STACK = 'MODULE_EXTENDED_INFO_SELECTED_STACK';
// export type MODULE_EXTENDED_INFO_SELECTED_STACK = typeof MODULE_EXTENDED_INFO_SELECTED_STACK;

// // TODO rename
// export interface SelectModuleForExtendedInfoStack {
//     type: MODULE_EXTENDED_INFO_SELECTED_STACK;
//     moduleId: ModuleId;
// }

// export function selectModuleForExtendedInfoStack(moduleId: ModuleId): SelectModuleForExtendedInfoStack {
//     return {
//         type: MODULE_EXTENDED_INFO_SELECTED_STACK,
//         moduleId
//     };
// }

// // -------------------------------------------------------------------------------------

// export const MODULE_EXTENDED_INFO_RESET = 'MODULE_EXTENDED_INFO_RESET';
// export type MODULE_EXTENDED_INFO_RESET = typeof MODULE_EXTENDED_INFO_RESET;

// // TODO rename
// export interface ResetModuleForExtendedInfo {
//     type: MODULE_EXTENDED_INFO_RESET;
// }

// export function resetModuleForExtendedInfo(): ResetModuleForExtendedInfo {
//     return {
//         type: MODULE_EXTENDED_INFO_RESET
//     };
// }

// // -------------------------------------------------------------------------------------
// export const MODULE_GROUP_INFO_SELECTED = 'MODULE_GROUP_INFO_SELECTED';
// export type MODULE_GROUP_INFO_SELECTED = typeof MODULE_GROUP_INFO_SELECTED;

// export interface UpdateGroupSet {
//     type: MODULE_GROUP_INFO_SELECTED;
//     name: string;
// }

// export function selectGroupForExtendedInfo(name: string): UpdateGroupSet {
//     return {
//         type: MODULE_GROUP_INFO_SELECTED,
//         name
//     };
// }

// // ---------------------------------------------------------------------------------------

// export const UI_CHANGE_RENDERED_PATH_TYPE = 'UI_CHANGE_RENDERED_PATH_TYPE';
// export type UI_CHANGE_RENDERED_PATH_TYPE = typeof UI_CHANGE_RENDERED_PATH_TYPE;

// // TODO rename
// export interface ChangeRenderedPathType {
//     type: UI_CHANGE_RENDERED_PATH_TYPE;
//     short: boolean;
// }

// export function changeRenderedPathType(short: boolean): ChangeRenderedPathType {
//     return {
//         type: UI_CHANGE_RENDERED_PATH_TYPE,
//         short
//     };
// }
// // ---------------------------------------------------------------------------------------
// // TODO separate action / reducer types
// const defaultValue: StoreState = {
//     nodes: [],
//     extendedModuleInfoId: null,
//     extendedModuleGroupId: '',
//     shortRenderedPathType: true,
//     moduleIdStack: []
// };

// export type updateModuleAction =
//     UpdateModuleSet |
//     UpdateGroupSet |
//     SelectModuleForExtendedInfo |
//     ChangeRenderedPathType |
//     SelectModuleForExtendedInfoStack |
//     ResetModuleForExtendedInfo;

// export default function reducer(state: StoreState = defaultValue, action: updateModuleAction): StoreState {
//     switch (action.type) {
//         case MODULE_SET_UPDATED:
//             return { ...state, nodes: action.nodes };

//         case MODULE_EXTENDED_INFO_SELECTED:
//             return {
//                 ...state,
//                 extendedModuleInfoId: action.moduleId,
//                 extendedModuleGroupId: '', // FIXME: should be heere
//                 moduleIdStack: []
//             };

//         // fuck stack, use url
//         case MODULE_EXTENDED_INFO_SELECTED_STACK:
//             return {
//                 ...state, 
//                 extendedModuleInfoId: action.moduleId,
//                 extendedModuleGroupId: '', // FIXME: should be heere
//                 moduleIdStack: state.moduleIdStack.concat(action.moduleId)
//             };

//         case MODULE_EXTENDED_INFO_RESET:
//             // smells. seems that stack should be somewhere on local level
//             return {
//                 ...state,
//                 extendedModuleInfoId: null,
//                 moduleIdStack: []
//             };

//         case MODULE_GROUP_INFO_SELECTED:
//             return {
//                 ...state,
//                 extendedModuleGroupId: action.name,
//                 extendedModuleInfoId: null // FIXME: should be heere
//             };

//         case UI_CHANGE_RENDERED_PATH_TYPE:
//             return { ...state, shortRenderedPathType: action.short };

//         default:
//             return state;
//     }
// }

// // ---------------------------------------------------------------------------------------
// export const extendedModuleInfoIdSelector = (state: StoreState): ModuleId => state.extendedModuleInfoId;
// export const extendedModuleGroupIdSelector = (state: StoreState): string => state.extendedModuleGroupId;
// export const renderedPathTypeSelector = (state: StoreState): boolean => state.shortRenderedPathType;
// export const moduleIdStackSelector = (state: StoreState): ModuleId[] => state.moduleIdStack;

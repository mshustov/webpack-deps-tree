// want to be moved to separate module
export const SORT_ASC = 'asc';
export type SortDirAsc = typeof SORT_ASC;

export const SORT_DESC = 'desc';
export type SortDirDesc = typeof SORT_DESC;

export type SortDir = SortDirAsc | SortDirDesc;

export const SortTypes: {[key: string]: SortDir} = {
    ASC: SORT_ASC,
    DESC: SORT_DESC
};

export type SortingOrder = {
    key: SortKey;
    direction: SortDir;
};

export type SortKey =
    'name' |
    'size' |
    'reasonsCount';

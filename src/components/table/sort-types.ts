// want to be moved to separate module
export const SORT_ASC = 'ASC';
export type SortTypeAsc = typeof SORT_ASC;

export const SORT_DESC = 'DESC';
export type SortTypeDesc = typeof SORT_DESC;

// not sure about export, but....
export type SortType = SortTypeAsc | SortTypeDesc;

export const SortTypes: {[key: string]: SortType} = {
    ASC: SORT_ASC,
    DESC: SORT_DESC
};

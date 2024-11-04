export type PaginationOptionsDomain={
    page:number;
    itemsPerPage:number;
    sortBy?: Array<{key:string, order:'asc'|'desc'}>;
    // sortBy?: {[key:string] :'asc'|'desc'};
    search?:string;
    columns?: string[];
}
// static createFilter(options, headers)
//     {   
//         let sortBy = '';
//         let sortDesc = false;
//         let itemsPerPage = '10';
//         let search = '';

import type { PaginationOptionsDomain } from "~/data/modules/shared/domain/PaginationOptions";


//         if(options?.itemsPerPage){
//             itemsPerPage = options.itemsPerPage;
//         }
//         if(isNaN(options.page))
//             options.page = 1;

//         if(options?.sortBy?.length >= 1){
//             sortBy = options.sortBy[0];
//         }
//         if(options?.sortDesc?.length >=1){
//             sortDesc = options.sortDesc[0]; 
//         }

//         if(options?.search != undefined && options?.search != ''){
           
//             search = options.search;
//         }

//         let headersString = '';
//         headers.forEach(h => {
//             headersString += `&columns[]=${h.value}`;
//         });

//         // return {search, page: options.page, itemsPerPage, sortBy, sortDesc}
//         return `?page=${options.page}&itemsPerPage=${itemsPerPage}&sortBy[]=${sortBy}&sortDesc[]=${sortDesc}&search=${search}${headersString}`;
//     }

export const usePaginationOptions = () => {
    /**
     * The function `url params` returns the URL complement to get right pagination,
     * @param {PaginationOptionsDomain} options 
     * @returns The function `url params` returns a string.
     */
    const urlParams = (options: PaginationOptionsDomain): string => {

        // if( Object.prototype.hasOwnProperty.call(options, 'sortBy') && options.sortBy && options.sortBy.length > 0 ){
        //     if(options.sortBy.length < 1){
        //         options.sortBy = [{key: 'created_at', order: 'desc'}];
        //     }
        // }else{
        //     options.sortBy = [{key: 'created_at', order: 'desc'}];
        // }

        let rest_url = "";
        if(options.search){
            rest_url += `&search=${options.search}`;
        }
        options.columns?.forEach(h => {
            rest_url += `&columns[]=${h}`;
        });
        options.sortBy?.forEach((x, h) => {
            rest_url += `&sortBy[${x.key}]=${x.order}`;
        });
        return `?page=${options.page}&itemsPerPage=${options.itemsPerPage}${rest_url}`;
    }

    return {
        urlParams
    }
}
import type { PaginationDomain } from "../../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../../shared/domain/PaginationOptions";
import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { CreateFileMessageDomain, CreateTextMessageDomain, DetailMessageDomain, UpdateFileMessageDomain, UpdateTextMessageDomain } from "./message.domain";


export interface MessageRepositoryDomain {
    list: (chat_room: string, data: PaginationOptionsDomain) => Promise<PaginationDomain<DetailMessageDomain> >;
    createTextMessage: (chat_room: string, data: CreateTextMessageDomain) => Promise<ResponseSuccess>;
    createFileMessage: (chat_room: string, data: CreateFileMessageDomain) => Promise<ResponseSuccess>;
    detail: (id:string) => Promise<DetailMessageDomain>;
    updateTextMessage: (id:string, data: UpdateTextMessageDomain) => Promise<ResponseSuccess>;
    updateFileMessage: (id:string, data: UpdateFileMessageDomain) => Promise<ResponseSuccess>;
    destroy: (id:string) => Promise<ResponseSuccess>;
}
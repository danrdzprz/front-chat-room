import type { PaginationDomain } from "../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../shared/domain/PaginationOptions";
import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { CreateChatRoomDomain, DetailChatRoomDomain, UpdateChatRoomDomain } from "./chat-room.domain";


export interface ChatRoomRepositoryDomain {
    list: (data: PaginationOptionsDomain) => Promise<PaginationDomain<DetailChatRoomDomain> >;
    create: (data: CreateChatRoomDomain) => Promise<ResponseSuccess>;
    detail: (id:string) => Promise<DetailChatRoomDomain>;
    update: (id:string, data: UpdateChatRoomDomain) => Promise<ResponseSuccess>;
    destroy: (id:string) => Promise<ResponseSuccess>;
}
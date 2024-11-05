export interface CreateChatRoomDomain{
    name: string;
}

export interface DetailChatRoomDomain extends CreateChatRoomDomain{
    _id: string;
    createdAt: string;
}

export interface UpdateChatRoomDomain extends CreateChatRoomDomain{
}
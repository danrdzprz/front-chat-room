import type { UserDomain } from "~/data/modules/auth/domain/user.domain";

export interface CreateTextMessageDomain{
    text: string;
}

export interface CreateFileMessageDomain{
    file: string;
    text: string;
}

export interface DetailMessageDomain extends CreateTextMessageDomain, CreateFileMessageDomain{
    _id: string;
    owner: UserDomain;
    createdAt: string;
}

export interface UpdateTextMessageDomain extends CreateTextMessageDomain{
}

export interface UpdateFileMessageDomain extends CreateFileMessageDomain{
}
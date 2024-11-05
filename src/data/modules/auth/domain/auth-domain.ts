import type { UserDomain } from "./user.domain";

export interface LoginDomain {
    email: string;
    password: string;
}

export interface RegisterDomain {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}


export interface AuthSuccessDomain  {
    access_token: string;
}

export interface MeDomain extends UserDomain {
};

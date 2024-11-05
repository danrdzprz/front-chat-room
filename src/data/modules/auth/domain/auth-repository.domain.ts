import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { AuthSuccessDomain, LoginDomain, MeDomain, RegisterDomain } from "./auth-domain";

export interface AuthRepository {
	login: (data: LoginDomain) => Promise<AuthSuccessDomain>;
	register: (data: RegisterDomain) => Promise<ResponseSuccess>;
	logout: () => Promise<ResponseSuccess>;
	me: () => Promise<MeDomain>;
}
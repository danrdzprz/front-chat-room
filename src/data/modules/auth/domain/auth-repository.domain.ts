import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { AuthSuccessDomain, LoginDomain, MeDomain } from "./auth-domain";

export interface AuthRepository {
	login: (data: LoginDomain) => Promise<AuthSuccessDomain>;
	logout: () => Promise<ResponseSuccess>;
	me: () => Promise<MeDomain>;
}
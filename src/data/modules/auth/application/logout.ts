import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { AuthRepository } from "../domain/auth-repository.domain";

export function useCaseLogout(authRepository: AuthRepository) {
	return async (): Promise<ResponseSuccess> => {
		return await authRepository.logout();
	};
}
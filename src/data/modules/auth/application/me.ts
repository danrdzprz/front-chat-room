import type { MeDomain } from '../domain/auth-domain';
import type { AuthRepository } from '../domain/auth-repository.domain';

export function useCaseGetMe(authRepository: AuthRepository) {
	return async (): Promise<MeDomain> => {
		return await authRepository.me();
	};
}
import type { AuthSuccessDomain, LoginDomain } from '../domain/auth-domain';
import type { AuthRepository } from '../domain/auth-repository.domain';

export function useCaseLogin(authRepository: AuthRepository) {
	return async (data: LoginDomain): Promise<AuthSuccessDomain> => {
		return await authRepository.login(data);
	};
}
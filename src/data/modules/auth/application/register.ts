import type { ResponseSuccess } from '../../shared/domain/ResponseSuccess';
import type { RegisterDomain } from '../domain/auth-domain';
import type { AuthRepository } from '../domain/auth-repository.domain';

export function useCaseRegister(authRepository: AuthRepository) {
	return async (data: RegisterDomain): Promise<ResponseSuccess> => {
		return await authRepository.register(data);
	};
}
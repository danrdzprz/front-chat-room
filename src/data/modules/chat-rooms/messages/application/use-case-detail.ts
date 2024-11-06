import type { DetailMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";


export function useCaseDetailMessage(repository: MessageRepositoryDomain) {
	return async (id: string): Promise<DetailMessageDomain> => {
		return await repository.detail(id);
	};
}
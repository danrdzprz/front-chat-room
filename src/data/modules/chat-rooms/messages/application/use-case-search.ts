import type { DetailMessageDomain, SearchMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseSearchMessage(repository: MessageRepositoryDomain) {
	return async (id: string, data: SearchMessageDomain): Promise<DetailMessageDomain[]> => {
		return await repository.searchMessage(id, data);
	};
}
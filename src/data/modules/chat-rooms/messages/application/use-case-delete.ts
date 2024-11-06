import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseDeleteMessage(repository: MessageRepositoryDomain) {
	return async (id: string): Promise<ResponseSuccess> => {
		return await repository.destroy(id);
	};
}
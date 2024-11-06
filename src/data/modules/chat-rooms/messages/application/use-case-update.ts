import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { UpdateTextMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseUpdateTextMessage(repository: MessageRepositoryDomain) {
	return async (id: string, data: UpdateTextMessageDomain): Promise<ResponseSuccess> => {
		return await repository.updateTextMessage(id, data);
	};
}
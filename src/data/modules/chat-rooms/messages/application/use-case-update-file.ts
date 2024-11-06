import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { UpdateFileMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseUpdateTextMessage(repository: MessageRepositoryDomain) {
	return async (id: string, data: UpdateFileMessageDomain): Promise<ResponseSuccess> => {
		return await repository.updateFileMessage(id, data);
	};
}
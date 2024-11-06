import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { CreateFileMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseCreateFileMessage(repository: MessageRepositoryDomain) {
	return async (chat_room: string, data: CreateFileMessageDomain): Promise<ResponseSuccess> => {
		return await repository.createFileMessage(chat_room, data);
	};
}
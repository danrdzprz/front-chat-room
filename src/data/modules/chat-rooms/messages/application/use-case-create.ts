import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { CreateTextMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseCreateTextMessage(repository: MessageRepositoryDomain) {
	return async (chat_room: string, data: CreateTextMessageDomain): Promise<ResponseSuccess> => {
		return await repository.createTextMessage(chat_room, data);
	};
}
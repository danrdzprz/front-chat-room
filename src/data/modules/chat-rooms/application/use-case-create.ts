import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { CreateChatRoomDomain } from "../domain/chat-room.domain";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";

export function useCaseCreateChatRoom(repository: ChatRoomRepositoryDomain) {
	return async (data: CreateChatRoomDomain): Promise<ResponseSuccess> => {
		return await repository.create(data);
	};
}
import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { UpdateChatRoomDomain } from "../domain/chat-room.domain";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";

export function useCaseUpdateChatRoom(repository: ChatRoomRepositoryDomain) {
	return async (id: string, data: UpdateChatRoomDomain): Promise<ResponseSuccess> => {
		return await repository.update(id, data);
	};
}
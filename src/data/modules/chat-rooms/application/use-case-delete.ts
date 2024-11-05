import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";

export function useCaseDeleteChatRoom(repository: ChatRoomRepositoryDomain) {
	return async (id: string): Promise<ResponseSuccess> => {
		return await repository.destroy(id);
	};
}
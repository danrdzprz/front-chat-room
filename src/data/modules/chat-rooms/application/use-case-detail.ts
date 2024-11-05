import type { DetailChatRoomDomain } from "../domain/chat-room.domain";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";


export function useCaseDetailChatRoom(repository: ChatRoomRepositoryDomain) {
	return async (id: string): Promise<DetailChatRoomDomain> => {
		return await repository.detail(id);
	};
}
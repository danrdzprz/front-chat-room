import type { PaginationDomain } from "../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../shared/domain/PaginationOptions";
import type { DetailChatRoomDomain } from "../domain/chat-room.domain";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";

export function useCaseListChatRooms(repository: ChatRoomRepositoryDomain) {
	return async (data: PaginationOptionsDomain): Promise<PaginationDomain<DetailChatRoomDomain>> => {
		return await repository.list(data);
	};
}
import type { PaginationDomain } from "../../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../../shared/domain/PaginationOptions";
import type { DetailMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function useCaseListMessages(repository: MessageRepositoryDomain) {
	return async (chat_room_id: string, data: PaginationOptionsDomain): Promise<PaginationDomain<DetailMessageDomain>> => {
		return await repository.list(chat_room_id, data);
	};
}
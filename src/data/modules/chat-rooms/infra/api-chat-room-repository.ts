import type { PaginationDomain } from "../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../shared/domain/PaginationOptions";
import type { ResponseFailure } from "../../shared/domain/ResponseFailure";
import type { ResponseSuccess } from "../../shared/domain/ResponseSuccess";
import type { CreateChatRoomDomain, DetailChatRoomDomain, UpdateChatRoomDomain } from "../domain/chat-room.domain";
import type { ChatRoomRepositoryDomain } from "../domain/chat-room.repository.domain";

export function ApiChatRoomRepository(): ChatRoomRepositoryDomain {

	async function list(data: PaginationOptionsDomain): Promise<PaginationDomain<DetailChatRoomDomain> > {
		const { urlParams  } = usePaginationOptions();
		const response = await request(`/api/chat-rooms${urlParams(data)}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json() as PaginationDomain<DetailChatRoomDomain>;
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function create(data:CreateChatRoomDomain): Promise<ResponseSuccess> {

		const response = await request(`/api/chat-rooms`,{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function detail(id:string): Promise<DetailChatRoomDomain > {
		
		const response = await request(`/api/chat-rooms/${id}`,{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function update(id:string, data: UpdateChatRoomDomain): Promise<ResponseSuccess> {
		
		const response = await request(`/api/chat-rooms/${id}`,{
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if(response.ok){
			return await response.json() as ResponseSuccess;
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function destroy(id: string): Promise<ResponseSuccess> {
		const response = await request(`/api/chat-rooms/${id}`,{
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
	
	return {
		list,
        create,
        detail,
        update,
        destroy,
	};
}
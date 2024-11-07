import type { PaginationDomain } from "../../../shared/domain/Pagination";
import type { PaginationOptionsDomain } from "../../../shared/domain/PaginationOptions";
import type { ResponseFailure } from "../../../shared/domain/ResponseFailure";
import type { ResponseSuccess } from "../../../shared/domain/ResponseSuccess";
import type { CreateFileMessageDomain, CreateTextMessageDomain, DetailMessageDomain, SearchMessageDomain, UpdateFileMessageDomain, UpdateTextMessageDomain } from "../domain/message.domain";
import type { MessageRepositoryDomain } from "../domain/message.repository.domain";

export function ApiMessageRepository(): MessageRepositoryDomain {

	async function list(id: string, data: PaginationOptionsDomain): Promise<PaginationDomain<DetailMessageDomain> > {
		const { urlParams  } = usePaginationOptions();
		const response = await request(`/api/chat-rooms/${id}/messages${urlParams(data)}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json() as PaginationDomain<DetailMessageDomain>;
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function createTextMessage(id: string, data:CreateTextMessageDomain): Promise<ResponseSuccess> {

		const response = await request(`/api/chat-rooms/${id}/text-message`,{
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
	async function createFileMessage(id: string, data:CreateFileMessageDomain): Promise<ResponseSuccess> {
		const formData = new FormData();
		formData.append("file", data.file);
		formData.append("text", `${data.text}`);

		const response = await request(`/api/chat-rooms/${id}/file-message`,{
			method: 'POST',
            body: formData,
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function detail(id:string): Promise<DetailMessageDomain > {
		
		const response = await request(`/api/messages/${id}`,{
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
    async function updateTextMessage(id:string, data: UpdateTextMessageDomain): Promise<ResponseSuccess> {
		
		const response = await request(`/api/messages/${id}`,{
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
	async function updateFileMessage(id:string, data: UpdateFileMessageDomain): Promise<ResponseSuccess> {
		const formData = new FormData();
		formData.append("file", data.file);
		formData.append("text", `${data.text}`);

		const response = await request(`/api/messages/${id}`,{
			method: 'POST',
            body: formData,
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function destroy(id: string): Promise<ResponseSuccess> {
		const response = await request(`/api/messages/${id}`,{
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

	async function searchMessage(id: string, data: SearchMessageDomain): Promise<DetailMessageDomain[]> {
		const response = await request(`/api/chat-rooms/${id}/search-message?text=${data.text}`,{
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
	
	return {
		list,
        createTextMessage,
        createFileMessage,
        detail,
        updateTextMessage,
        updateFileMessage,
        destroy,
		searchMessage,
	};
}
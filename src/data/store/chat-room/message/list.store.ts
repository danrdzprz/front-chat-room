import { defineStore } from 'pinia';
import { useCaseListMessages } from '~/data/modules/chat-rooms/messages/application/use-case-list';
import type { DetailMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import type { PaginationDomain } from '~/data/modules/shared/domain/Pagination';
import type { PaginationOptionsDomain } from '~/data/modules/shared/domain/PaginationOptions';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useListMessage =
   defineStore('MESSAGES_LIST',{
      state: ():{status: RequestStatus, data: PaginationDomain<DetailMessageDomain>, list: DetailMessageDomain[]}=> {
        return {
          status:RequestStatus.INITIAL,
          data:{
            data: [],
            total: 0,
            total_pages: 0,
            current_page: 0,
            previous_page: null,
            next_page: null
          },
          list:[]
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        appendToList(data: DetailMessageDomain){
          const index = this.list.findIndex( (element, x )=> element._id===data._id);
          if (index < 0) {
            this.list = [...this.list, data];
          }
        },
        remove(id: string){
          const index = this.list.findIndex( (element, x )=> element._id===id);
          if (index > -1) {
            this.list.splice(index, 1);
          }
        },
        async getList(chat_room: string, data: PaginationOptionsDomain) {
          const repository = ApiMessageRepository();
          this.status = RequestStatus.LOADING;
          return await useCaseListMessages(
              repository,
            )(chat_room, data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.data = response;
              this.list = [ ...this.data.data.slice().reverse(), ...this.list,];
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              HandleServerErrors(error);
            });
        }
      }
});
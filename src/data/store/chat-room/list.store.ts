import { defineStore } from 'pinia';
import { useCaseListChatRooms } from '~/data/modules/chat-rooms/application/use-case-list';
import type { DetailChatRoomDomain } from '~/data/modules/chat-rooms/domain/chat-room.domain';
import { ApiChatRoomRepository } from '~/data/modules/chat-rooms/infra/api-chat-room-repository';
import type { PaginationDomain } from '~/data/modules/shared/domain/Pagination';
import type { PaginationOptionsDomain } from '~/data/modules/shared/domain/PaginationOptions';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useListChatRoom =
   defineStore('CHAT_ROOM_LIST',{
      state: ():{status: RequestStatus, data: PaginationDomain<DetailChatRoomDomain>, list: DetailChatRoomDomain[]}=> {
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
        appendToList(data: DetailChatRoomDomain){
          const index = this.list.findIndex( (element, x )=> element._id===data._id);
          if (index < 0) {
            this.list = [data,...this.list];
          }
        },
        remove(id: string){
          const index = this.list.findIndex( (element, x )=> element._id===id);
          if (index > -1) {
            this.list.splice(index, 1);
          }else{
            // this.list.push(item);
          }

          // this.list = [data,...this.list];
        },
        async getList(data: PaginationOptionsDomain) {
          const repository = ApiChatRoomRepository();
          this.status = RequestStatus.LOADING;
          return await useCaseListChatRooms(
              repository,
            )(data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.data = response;
              this.list = [...this.list,... this.data.data];
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              HandleServerErrors(error);
            });
        }
      }
});
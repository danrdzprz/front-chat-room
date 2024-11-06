import { defineStore } from 'pinia';
import { useCaseDetailChatRoom } from '~/data/modules/chat-rooms/application/use-case-detail';
import type { DetailChatRoomDomain } from '~/data/modules/chat-rooms/domain/chat-room.domain';
import { ApiChatRoomRepository } from '~/data/modules/chat-rooms/infra/api-chat-room-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useDetailChatRoom =
   defineStore('CHAT_ROOM_DETAIL',{
      state: ():{status: RequestStatus, data: DetailChatRoomDomain}=> {
        return {
          status:RequestStatus.INITIAL,
          data:{
            _id: '',
            createdAt: '',
            name: ''
          }
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getMe(id: string) {
          const token = useCookie('token'); // useCookie new hook in nuxt 3
          const repository = ApiChatRoomRepository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await useCaseDetailChatRoom(
              repository,
            )(id)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.data = response;
              return response;
            })
            .catch(error => {
              token.value = null; // set token to cookie
              this.status = RequestStatus.ERROR ;
              HandleServerErrors(error);
            });
        }
      }
});
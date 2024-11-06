import { defineStore } from 'pinia';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';
import { ApiChatRoomRepository } from '~/data/modules/chat-rooms/infra/api-chat-room-repository';
import { useCaseCreateChatRoom } from '~/data/modules/chat-rooms/application/use-case-create';
import type { CreateChatRoomDomain } from '~/data/modules/chat-rooms/domain/chat-room.domain';

export const useCreateChatRoom = defineStore('CHAT_ROOM_CREATE',{
      state: ():{status: RequestStatus, message:  ResponseSuccess['message'] | null, errors: ResponseFailure["message"]}=> {
        return {
          status:RequestStatus.INITIAL,
          message: null,
          errors: ''
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async register(data: CreateChatRoomDomain) {
          const repository = ApiChatRoomRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseCreateChatRoom(
              repository,
            )(data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.message = HandleSuccessResponse(response);
              return response;
            })
            .catch( e => {
              this.status = RequestStatus.ERROR ;
              this.errors = HandleServerErrors(e);
            });
        },
        setFormStatus( value: RequestStatus ) {
          return this.status = value;
        },
        resetForm() {
          return this.status = RequestStatus.INITIAL;
        },
      }
  });

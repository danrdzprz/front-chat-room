import { defineStore } from 'pinia';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';
import { ApiChatRoomRepository } from '~/data/modules/chat-rooms/infra/api-chat-room-repository';
import { useCaseDeleteChatRoom } from '~/data/modules/chat-rooms/application/use-case-delete';

export const useDeleteChatRoom = defineStore('CHAT_ROOM_DELETE',{
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
        async remove(id: string) {
          const repository = ApiChatRoomRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseDeleteChatRoom(
              repository,
            )(id)
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

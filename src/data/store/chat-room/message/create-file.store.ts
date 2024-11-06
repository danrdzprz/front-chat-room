import { defineStore } from 'pinia';
import { useCaseCreateFileMessage } from '~/data/modules/chat-rooms/messages/application/use-case-create-file';
import type { CreateFileMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';

export const useCreateFileMessage = defineStore('FILE_MESSAGE_CREATE',{
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
        async sendMessage(chat_room: string, data: CreateFileMessageDomain) {
          const repository = ApiMessageRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseCreateFileMessage(
              repository,
            )(chat_room, data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
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

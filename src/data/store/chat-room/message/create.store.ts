import { defineStore } from 'pinia';
import { useCaseCreateTextMessage } from '~/data/modules/chat-rooms/messages/application/use-case-create';
import type { CreateTextMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';

export const useCreateTextMessage = defineStore('TEXT_MESSAGE_CREATE',{
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
        async sendMessage(chat_room: string, data: CreateTextMessageDomain) {
          this.$reset();
          const repository = ApiMessageRepository();
          this.status = RequestStatus.LOADING ;
          return await useCaseCreateTextMessage(
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
      }
  });

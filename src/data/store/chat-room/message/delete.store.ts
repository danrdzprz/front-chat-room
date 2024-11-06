import { defineStore } from 'pinia';
import { useCaseDeleteMessage } from '~/data/modules/chat-rooms/messages/application/use-case-delete';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';

export const useDeleteMessage = defineStore('MESSAGE_DELETE',{
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
          const repository = ApiMessageRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseDeleteMessage(
              repository,
            )(id)
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

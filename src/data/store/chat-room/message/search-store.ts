import { defineStore } from 'pinia';
import { useCaseSearchMessage } from '~/data/modules/chat-rooms/messages/application/use-case-search';
import type { DetailMessageDomain, SearchMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useSearchMessage =
   defineStore('MESSAGE_SEARCH',{
      state: ():{status: RequestStatus, data: DetailMessageDomain[]}=> {
        return {
          status:RequestStatus.INITIAL,
          data:[]
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async search(id: string, data: SearchMessageDomain) {
          const repository = ApiMessageRepository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await useCaseSearchMessage(
              repository,
            )(id, data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.data = response;
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              HandleServerErrors(error);
            });
        }
      }
});
import { defineStore } from 'pinia';
import { useCaseDetailMessage } from '~/data/modules/chat-rooms/messages/application/use-case-detail';
import type { DetailMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { ApiMessageRepository } from '~/data/modules/chat-rooms/messages/infra/api-messages-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useDetailMessage =
   defineStore('MESSAGE_DETAIL',{
      state: ():{status: RequestStatus, data: DetailMessageDomain}=> {
        return {
          status:RequestStatus.INITIAL,
          data:{
            _id: '',
            owner: {
              _id: '',
              name: '',
              email: ''
            },
            createdAt: '',
            text: '',
            file: ''
          }
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getDetail(id: string) {
          const repository = ApiMessageRepository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await useCaseDetailMessage(
              repository,
            )(id)
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
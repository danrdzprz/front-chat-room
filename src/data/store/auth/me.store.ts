import { defineStore } from 'pinia';
import { useCaseGetMe } from '~/data/modules/auth/application/me';
import type { MeDomain } from '~/data/modules/auth/domain/auth-domain';
import type { AuthRepository } from '~/data/modules/auth/domain/auth-repository.domain';
import { apiAuthRepository } from '~/data/modules/auth/infra/api-auth-repository';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';

export const useMeStore =
   defineStore('AUTH_ME',{
      state: ():{status: RequestStatus, me_data: MeDomain}=> {
        return {
          status:RequestStatus.INITIAL,
          me_data:{
            _id: '',
            name: '',
            email: ''
          }
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getMe() {
          const token = useCookie('token'); // useCookie new hook in nuxt 3
          const repository = apiAuthRepository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await useCaseGetMe(
              repository,
            )()
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.me_data = response;
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
import { defineStore } from 'pinia';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import { apiAuthRepository } from '~/data/modules/auth/infra/api-auth-repository';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';
import { useCaseLogout } from '~/data/modules/auth/application/logout';

export const useLogoutStore = defineStore('AUTH_LOGOUT',{
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
        async logout() {
          const repository = apiAuthRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseLogout(
              repository,
            )()
            .then(response => {
              const token = useCookie('token');
              token.value = null;
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

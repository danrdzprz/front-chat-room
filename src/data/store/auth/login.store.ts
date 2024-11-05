import { defineStore } from 'pinia';
import type { LoginDomain } from '~/data/modules/auth/domain/auth-domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import { apiAuthRepository } from '~/data/modules/auth/infra/api-auth-repository';
import { useCaseLogin } from '~/data/modules/auth/application/login';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';

export const useLoginStore = defineStore('AUTH_LOGIN',{
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
        async submitLogin(data: LoginDomain) {
          const repository = apiAuthRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseLogin(
              repository,
            )(data)
            .then(response => {
              const token = useCookie('token',
                {
                  maxAge: 7 * 24 * 3600 * 1000,
                  sameSite: 'strict',
                  secure: true
                }
              );
              token.value = response.access_token;
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

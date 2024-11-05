import { defineStore } from 'pinia';
import type { RegisterDomain } from '~/data/modules/auth/domain/auth-domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import { apiAuthRepository } from '~/data/modules/auth/infra/api-auth-repository';
import type { ResponseSuccess } from '~/data/modules/shared/domain/ResponseSuccess';
import { useCaseRegister } from '~/data/modules/auth/application/register';

export const useRegisterStore = defineStore('AUTH_REGISTER',{
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
        async registerUser(data: RegisterDomain) {
          const repository = apiAuthRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await useCaseRegister(
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

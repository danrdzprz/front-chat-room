import { defineStore } from 'pinia';
import type { AuthSuccess } from '~/modules/auth/domain/AuthSucces';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import { UseCaseRegister } from '~/modules/shop/auth/application/register';
import type { RegisterCustomer } from '~/modules/shop/auth/domain/auth.domain';
import type { CustomerAuthRepository } from '~/modules/shop/auth/domain/auth.repository.domain';
import { useFeedBackStore } from '~/store/feedback.store';
// export factory function, factory pattern
export function useRegisterStore(repository: CustomerAuthRepository) {
  return defineStore('SHOP_AUTH_REGISTER',{
      state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null, errors: ResponseFailure["errors"]} => {
        return {
          status:RequestStatus.INITIAL,
          message: null,
          errors:[]
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async registerCustomer(data: RegisterCustomer) {
          const feedback = useFeedBackStore();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await UseCaseRegister(
              repository,
            )(data)
            .then(response => {
              const token = useCookie('token');
              token.value = (response as AuthSuccess).token;
              this.status = RequestStatus.SUCCESS ;
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              try {
                this.message = error as ResponseFailure;
                const {errors, message} = error as ResponseFailure;
                if(errors){
                  for (const key in errors) {
                    if (Object.prototype.hasOwnProperty.call(errors, key)) {
                      const element = errors[key];
                      for (const msg of element) {
                        feedback.openError({message:`${msg}`});
                      }
                    }
                  }
                  this.errors = errors;
                }
                if(message){
                  this.errors = [ message ]
                  // feedback.openError({message:`${message}`});
                }
                return errors;
              } catch (error) {
                feedback.openError({message:'Error en el servidor'});
                return null;
              }
            });
        },
        setFormStatus( value: RequestStatus ) {
          return this.status = value;
        },
        resetForm() {
          return this.status = RequestStatus.INITIAL;
        },
      }
  })();
}

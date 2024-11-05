import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import { UseCaseLogout } from '~/modules/shop/auth/application/logout';
import type { CustomerAuthRepository } from '~/modules/shop/auth/domain/auth.repository.domain';
import { useFeedBackStore } from '~/store/feedback.store';


// export factory function, factory pattern
export function useLogoutStore(repository: CustomerAuthRepository) {
  return defineStore('SHOP_AUTH_LOGOUT',{
      state: () => {
        return {
          status:RequestStatus.INITIAL,
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async logoutAction() {
          const feedback = useFeedBackStore();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await UseCaseLogout(
              repository,
            )()
            .then(response => {
              const token = useCookie('token');
              const user_type = useCookie('user_type');
              token.value = null;
              user_type.value = null;
              this.status = RequestStatus.SUCCESS ;
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              try {
                const {errors, message} = error as ResponseFailure;
                if(errors){
                  for (const error of errors) {
                    feedback.openError({message:`${error}`});
                  }
                }
                console.log(error);
                if(message){
                  feedback.openError({message:`${message}`});
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
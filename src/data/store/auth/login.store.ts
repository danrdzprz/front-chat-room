import { defineStore } from 'pinia';
import type { AuthSuccessDomain, LoginDomain } from '~/data/modules/auth/domain/auth-domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { ResponseFailure } from '~/data/modules/shared/domain/ResponseFailure';
import { useFeedbackStore } from '../feedback.store';
import { apiAuthRepository } from '~/data/modules/auth/infra/api-auth-repository';
import { useCaseLogin } from '~/data/modules/auth/application/login';

export const useLoginStore = defineStore('SHOP_AUTH_LOGIN',{
      state: ():{status: RequestStatus, message:  AuthSuccessDomain | null, errors: ResponseFailure["errors"]}=> {
        return {
          status:RequestStatus.INITIAL,
          message: null,
          errors: []
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async submitLogin(data: LoginDomain) {
          const repository = apiAuthRepository();
          const feedback = useFeedbackStore();
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
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              try {
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
  });

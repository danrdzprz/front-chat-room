<template>
    <VContainer fluid class="fill-height">
      <VRow no-gutters align="center" justify="center" style="z-index: 9999;">
        <VCol cols="12" md="6" lg="7" sm="6" xs="12" class="mb-6">
          <VRow no-gutters align="start" justify="center" class="login-text-color">
            <VCol align-self="start">
              <VImg
                  aspect-ratio="1/1"
                  :src="localImage('login','pixeltrue-chatting-using-phone','png')"
                >
              </VImg>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="10" sm="10" md="6" lg="5">
          <VRow no-gutters align="center" justify="center">
            <VCol cols="12" sm="12" md="6" lg="6" >
              <div class="text-center">
                <h1 class="login-text-color">{{ $t('chat.sign_up.title') }}</h1>
                <p class="login-text-color">{{ $t('chat.sign_up.subtitle') }}</p>
              </div>
  
              <form autocomplete="on"  @submit.prevent="onSubmit" class="mt-7">
                <FormsLogin></FormsLogin>
  
               
                
                <VRow>
                  <VCol>
                    <div>
                      <VBtn 
					            :loading="login_store.status === RequestStatus.LOADING"
                      type="submit" block min-height="44" class="gradient primary" color="primary" rounded="xl">{{ $t('chat.sign_up.sign_up_button') }}</VBtn>
                    </div>
                  </VCol>
                </VRow>
  
                
              </form>
                <p class="styled-hyperlink text-subtitle-2 text-high-emphasis text-end">
                {{ $t('chat.register.text_1') }} <NuxtLink to="/register" class="font-weight-bold text-dark text-button">{{ $t('chat.register.text_2') }}</NuxtLink>
                </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
import { useForm } from 'vee-validate';
import type { LoginDomain } from '~/data/modules/auth/domain/auth-domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import { ResolverLoginSchema } from '~/data/schemes/auth/login.scheme';
import { useLoginStore } from '~/data/store/auth/login.store';

    definePageMeta({
        layout: 'default'
    })

    useHead({
        title: 'Chat Room || Iniciar sesión'
    })

    const { localImage  } = useImageSrc();

    const login_store = useLoginStore();
    
    const { $io } : { $io: Socket} = useNuxtApp();

    const { handleSubmit, handleReset,setErrors,errors,values } = useForm<LoginDomain>({
        validationSchema: ResolverLoginSchema(),
    });

    const onSubmit = handleSubmit(async values => {
		login_store.submitLogin(values);
    });

	login_store.$subscribe(async(mutation, state) => {
		if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
			if ("PasswordCredential" in window) {
        // @ts-ignore
        let credential = new PasswordCredential({
          id: values.email,
          password: values.password,
        });

			navigator.credentials.store(credential).then(
				() => {
				console.info("Credential stored in the user agent's credential manager.");
				},
				(err) => {
				console.error("Error while storing the credential: ", err);
				},
			);
			}

      const token = useCookie('token'); // get token from cookies
      if(token.value){
        $io.auth = {token : `Bearer ${token.value}`};
        $io.connect();
      }
      
			reloadNuxtApp({
				path: `/chat`
			});
		}
		if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
			setErrors(login_store.errors as any);
		}
	});

	onUnmounted(async()=>{
		login_store.$reset();
	})


</script>
  
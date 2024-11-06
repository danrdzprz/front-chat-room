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
                <h1 class="login-text-color">{{ $t('chat.register.title') }}</h1>
                <p class="login-text-color">{{ $t('chat.sign_up.subtitle') }}</p>
              </div>
  
              <form autocomplete="on"  @submit.prevent="onSubmit" class="mt-7">
                <FormsRegister></FormsRegister>
                
                <VRow>
                  <VCol>
                    <div>
                      <VBtn 
					            :loading="register_store.status === RequestStatus.LOADING"
                      type="submit" block min-height="44" class="gradient primary" color="primary" rounded="xl">{{ $t('chat.register.register_button') }}</VBtn>
                    </div>
                  </VCol>
                </VRow>
              </form>
                <p class="styled-hyperlink text-subtitle-2 text-high-emphasis text-end">
                {{ $t('chat.sign_up.text_1') }} <NuxtLink to="/" class="font-weight-bold text-dark text-button">{{ $t('chat.sign_up.text_2') }}</NuxtLink>
                </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';
    import type { RegisterDomain } from '~/data/modules/auth/domain/auth-domain';
    import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
    import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
    import { ResolverRegisterSchema } from '~/data/schemes/auth/register.scheme';
    import { useRegisterStore } from '~/data/store/auth/register.store';

    definePageMeta({
        layout: 'default'
    })

    useHead({
        title: 'Chat Room || Iniciar sesión'
    })


    const router = useRouter()

    const { localImage  } = useImageSrc();

    const register_store = useRegisterStore();

    const { handleSubmit, handleReset,setErrors,errors,values } = useForm<RegisterDomain>({
        validationSchema: ResolverRegisterSchema(),
    });

    const onSubmit = handleSubmit(async values => {
       await register_store.registerUser(values);
    });

    register_store.$subscribe((mutation, state) => {
        if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
            navigateTo('/');
        }
        if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(register_store.errors as Errors);
        }
    });

    onUnmounted(()=>{
        register_store.$reset();
    })


</script>
  
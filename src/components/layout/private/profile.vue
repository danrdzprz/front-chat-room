
<template>
    <v-menu :close-on-content-click="true">
        <template v-slot:activator="{ props }">
            <span class="d-none d-sm-flex text-button text-white font-weight-bold">{{me_store.me_data.name}}</span>

            <v-btn
                icon
                v-bind="props"
                class="mr-2"
                size="x-large"
              >
              <v-avatar size="x-large" color="white" variant="outlined" >
                <v-icon icon="mdi-account" size="x-large"></v-icon>
              </v-avatar>
            </v-btn>  
        </template>
        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
            <div class="d-flex d-sm-none justify-center">
              <span class="text-button font-weight-bold px-5 my-1 text-center">{{me_store.me_data.name}}</span>
            </div>

            <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-divider class="my-3"></v-divider>
                            <v-btn @click="()=>logout()" :disabled="logout_store.status === RequestStatus.LOADING" color="primary" variant="outlined" block>
                                {{ $t('general.logout') }}
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
        </v-sheet>
    </v-menu>
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import { useLogoutStore } from '~/data/store/auth/logout.store';
import { useMeStore } from '~/data/store/auth/me.store';

const logout_store = useLogoutStore();
const me_store = useMeStore();
const { $io } : { $io: Socket} = useNuxtApp();

const logout = async() => {
  await logout_store.logout();
};

logout_store.$subscribe((mutation, state) => {
  if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
    navigateTo('/');
    $io.auth = {};
    $io.disconnect();
    $io.close();
  }
});

</script>

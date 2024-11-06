<template>
      <v-navigation-drawer width="244" floating v-model="menu.left_menu">
            <template v-slot:prepend>
                <div class="pa-2">
                    <v-btn block color="primary" id="activator-target">
                        {{ $t('general.new_chat_room') }}
                    </v-btn>
                </div>
            </template>
            <v-list>
            <v-list-item
                v-for="n in 20"
                :key="n"
                :title="`Item ${ n }`"
                link
            ></v-list-item>
            </v-list>
            
        </v-navigation-drawer>
        <DialogsForStore v-model:model-value="dialog" :title="$t('general.new_chat_room')">
            <template v-slot:[`form`]>
                <form autocomplete="on" id="form_new_chat_room" @submit.prevent="onSubmit" class="mt-7">
                    <FormsNewChat></FormsNewChat>
                </form>
            </template>
            <template v-slot:[`actions`]>
                <v-btn
                    :text="$t('general.cancel')"
                    variant="plain"
                    @click="dialog = false"
                    :loading="register_chatroom_store.status === RequestStatus.LOADING"
                ></v-btn>
                <v-btn
                    form="form_new_chat_room"
                    color="primary"
                    :text="$t('general.save')"
                    variant="tonal"
                    type="submit"
                    :loading="register_chatroom_store.status === RequestStatus.LOADING"
                ></v-btn>
            </template>
        </DialogsForStore>
        
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CreateChatRoomDomain } from '~/data/modules/chat-rooms/domain/chat-room.domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
import { ResolverCreateChatRoomSchema } from '~/data/schemes/chat-rooms/create.scheme';
import { useCreateChatRoom } from '~/data/store/chat-room/create.store';
import { useMenuState } from '~/data/store/menus.store';
    
    const menu = useMenuState();
    const dialog = shallowRef<boolean>(false);

    const register_chatroom_store = useCreateChatRoom();

    const { handleSubmit, handleReset,setErrors,errors,values } = useForm<CreateChatRoomDomain>({
        validationSchema: ResolverCreateChatRoomSchema(),
    });

    const onSubmit = handleSubmit(async values => {
       await register_chatroom_store.registerUser(values);
    });

    register_chatroom_store.$subscribe((mutation, state) => {
        if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
            handleReset();
            register_chatroom_store.$reset();
            dialog.value = false;
        }
        if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
            setErrors(register_chatroom_store.errors as Errors);
        }
    });

</script>
<style lang="scss">

</style>
<template>
    <v-sheet
        class="mx-auto sticky-chat-menu"
    >   
        <div class="d-flex align-center justify-space-between">
            <h3 class="ml-5">{{ store_chatroom_detail.data.name }}</h3>
            <v-responsive max-width="300">
            <v-text-field
                bg-color="grey-lighten-1"
                density="compact"
                rounded="pill"
                variant="solo-filled"
                flat
                hide-details
            ></v-text-field>
            </v-responsive>
            <v-btn
                class="ma-2"
                color="green"
                icon="mdi-information-outline"
                variant="text"
                @click.stop="menu.toggleRightMenu()"
            ></v-btn>
        </div>
    </v-sheet>
    <ChatMessages :chat-room="record_id"></ChatMessages>
    <v-footer
            height="100"
            app
    >
        <!-- <form id="form_new_text_message" @submit.prevent="onSubmit" style="width: 100%;">
            <InputsTextMessageInput
                label="Escribe un mensaje"
                name="text"
                type="text"
                @send-message="onSubmit"
            >
            </InputsTextMessageInput>
        </form> -->
            <FormsTextMessage :chat-room="record_id" @send-file="() => toggle_form = !toggle_form" v-if="toggle_form"></FormsTextMessage>
            <FormsFileMessage :chat-room="record_id" @send-text="() => toggle_form = !toggle_form" v-else></FormsFileMessage>
            <!-- <v-text-field
            bg-color="grey-lighten-1"
            class="overflow-hidden"
            density="compact"
            rounded="pill"
            variant="solo-filled"
            flat
            hide-details
            ></v-text-field> -->
    </v-footer>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CreateTextMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
import { ResolverTextMessageSchema } from '~/data/schemes/chat-rooms/message/text-message.scheme';
import { useDetailChatRoom } from '~/data/store/chat-room/detail.store';
import { useCreateTextMessage } from '~/data/store/chat-room/message/create.store';
import { useMenuState } from '~/data/store/menus.store';

definePageMeta({
    layout: 'private'
})

useHead({
    title: 'Chat Room'
});

const toggle_form = ref(true);

const route = useRoute();

const record_id = route.params.id as string;

const store_chatroom_detail = useDetailChatRoom();

const store_text_message = useCreateTextMessage();

const { handleSubmit, handleReset,setErrors,errors,values } = useForm<CreateTextMessageDomain>({
        validationSchema: ResolverTextMessageSchema(),
});

const onSubmit = handleSubmit(async values => {
    await store_text_message.sendMessage(record_id, values);

});

store_text_message.$subscribe((mutation, state) => {
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        handleReset();
        store_text_message.$reset();
    }
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_text_message.errors as Errors);
    }
});

const menu = useMenuState();

onMounted(async ()=>{
    await store_chatroom_detail.getDetail(record_id);
});


</script>
<style lang="scss">
.sticky-chat-menu{
position: fixed;
top: 72.4px;
background-color: white;
z-index: 1;
// width: -webkit-fill-available;
// width: calc(var(--width) * .10);
// width: auto;
// width: 80%;
}
@media (max-width: 1279px) {
.sticky-chat-menu{
    width: 100vw;
}
}

@media (min-width: 1280px) {
.sticky-chat-menu{
    width: calc( 100vw - 250px );
}
}
</style>
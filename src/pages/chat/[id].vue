<template>
    <v-sheet
        class="mx-auto sticky-chat-menu"
    >   
        <div class="d-flex align-center justify-space-between">
            <h3 class="ml-5">{{ store_chatroom_detail.data.name }}</h3>
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
            <FormsFileMessage :chat-room="record_id"></FormsFileMessage>
            <FormsTextMessage :chat-room="record_id"></FormsTextMessage>
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
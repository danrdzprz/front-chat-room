<template>
        <form id="form_new_file_message" @submit.prevent="onSubmit" style="width: 100%;">
            <!-- <div class="d-flex" style="width: 100%;"> -->
                <!-- <v-btn
                    class="ma-2"
                    icon="mdi-text-box-edit-outline"
                    variant="text"
                    @click="$emit('sendText',true)"
                ></v-btn> -->
                <InputsFile
                    label="Elige un archivo"
                    name="text"
                    type="text"
                >
                </InputsFile>
            <!-- </div> -->
        </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CreateFileMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
import { ResolverTextMessageSchema } from '~/data/schemes/chat-rooms/message/text-message.scheme';
import { useCreateFileMessage } from '~/data/store/chat-room/message/create-file.store';
import { useCreateTextMessage } from '~/data/store/chat-room/message/create.store';


const props = withDefaults(
    defineProps<{
        chatRoom: string ;
    }>(),
    {
    },
);

const store_text_message = useCreateFileMessage();

const { handleSubmit, handleReset,setErrors } = useForm<CreateFileMessageDomain>({
        validationSchema: ResolverTextMessageSchema(),
});

const onSubmit = handleSubmit(async values => {
    await store_text_message.sendMessage(props.chatRoom, values);

});

defineEmits(['sendFile', 'sendText']);

store_text_message.$subscribe((mutation, state) => {
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        handleReset();
        store_text_message.$reset();
    }
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_text_message.errors as Errors);
    }
});




</script>
<template>
        <form id="form_new_text_message" @submit.prevent="onSubmit" style="width: 100%;">
            <InputsTextMessageInput
                label="Escribe un mensaje"
                name="text"
                type="text"
                @send-text="onSubmit"
                :loading="store_text_message.status === RequestStatus.LOADING"
            >
            </InputsTextMessageInput>
        </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CreateTextMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
import { ResolverTextMessageSchema } from '~/data/schemes/chat-rooms/message/text-message.scheme';
import { useCreateTextMessage } from '~/data/store/chat-room/message/create.store';


const props = withDefaults(
    defineProps<{
        chatRoom: string ;
    }>(),
    {
    },
);

const store_text_message = useCreateTextMessage();

defineEmits(['sendFile', 'sendText']);

const { handleSubmit, handleReset,setErrors } = useForm<CreateTextMessageDomain>({
        validationSchema: ResolverTextMessageSchema(),
});

const onSubmit = handleSubmit(async values => {
    await store_text_message.sendMessage(props.chatRoom, values);
});



store_text_message.$subscribe((mutation, state) => {
    console.log(state.status);
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        handleReset();
    }
    if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_text_message.errors as Errors);
    }
});




</script>
<template>
        <form id="form_new_file_message">
            <InputsButtonFile
                name="file"
                @send-file="()=>onSubmit()"
                :loading="store_text_message.status === RequestStatus.LOADING"
            >
            </InputsButtonFile>
        </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CreateFileMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Errors } from '~/data/modules/shared/domain/ResponseFailure';
import { ResolverFileMessageSchema } from '~/data/schemes/chat-rooms/message/file-message.scheme';
import { useCreateFileMessage } from '~/data/store/chat-room/message/create-file.store';

const props = withDefaults(
    defineProps<{
        chatRoom: string ;
    }>(),
    {
    },
);

const store_text_message = useCreateFileMessage();

const { handleSubmit, handleReset,setErrors, errors, values } = useForm<CreateFileMessageDomain>({
        validationSchema: ResolverFileMessageSchema(),
});

const onSubmit = handleSubmit(async values => {
    await store_text_message.sendMessage(props.chatRoom, values);

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




</script>
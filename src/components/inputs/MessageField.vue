<template>
    <VTextField
        :label="label"
        filled
        color="success"
        hide-details="auto" 
        outlined 
        density="compact"
        flat
        variant="solo"
        v-model="value"
        class="custom-text-field"
        @input="handleChange"
        :append-inner-icon="value ? 'mdi-send' : ''"
        prepend-icon="mdi-paperclip-plus"
        clear-icon="mdi-close-circle"
        label="Message"
        type="text"
        clearable
        @click:append-inner="()=> $emit('sendMessage',true)"
        @click:clear="clearMessage"
        @click:prepend="()=> $emit('sendImage',true)"
    ></VTextField>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  label: String,
  type: String,
  hint: String,
  required:{
    type: Boolean,
    required: false,
    default: false
  },
  persistentHint:{
    type: Boolean,
    required: false,
    default: false
  },
});

const show = ref(false);
const { errorMessage, value, handleChange, handleBlur, errors, setValue } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

defineEmits(['sendImage', 'sendMessage']);

  function sendMessage () {
      resetIcon()
      clearMessage()
  }
  function clearMessage () {
    setValue('');
  }
  function sendImage () {
  }

const validationListeners = {
  blur: evt => handleBlur(evt, true),
  change: handleChange,
  input: evt => handleChange(evt, !!errorMessage.value),
};
</script> 

<style lang="scss">
  .custom-text-field{
      .v-input__control .v-input__slot .v-text-field__slot .v-text-field__prefix{
          margin-top: 10px !important;
      }    

  }

  .custom-text-field{
    .v-input__control{
        .v-field{
            box-shadow: none;
            .v-field__overlay{
                background-color: rgb(var(--v-theme-inputBackground));
                border-radius: 25px;
            }
        }
    }
    .v-field--variant-solo, .v-field--variant-solo-filled{
      background-color: transparent;
    }
  }
</style>
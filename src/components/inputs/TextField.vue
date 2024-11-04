<template>
    <VTextField
        :label="label"
        :type="show ? 'text': type"
        filled
        color="success"
        hide-details="auto" 
        outlined 
        density="compact"
        flat
        variant="solo"
        v-model="value"
        :append-inner-icon="type === 'password' ? (show ? 'mdi-eye' : 'mdi-eye-off'): null"
        @input="handleChange"
        v-on="validationListeners"
        :error-messages="errorMessage"
        class="custom-text-field"
        autocomplete="on"
        @click:append-inner="show = !show"
        :hint="hint"
        :persistent-hint="persistentHint"
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
const { errorMessage, value, handleChange, handleBlur, errors } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

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
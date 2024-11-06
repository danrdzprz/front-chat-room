<template>
    <div class="d-flex">
      <v-file-input
          :label="label"
          filled
          color="success"
          hide-details="auto" 
          outlined 
          density="compact"
          flat
          variant="solo"
          v-model="value"
          append-inner-icon="mdi-file"
          @input="handleChange"
          v-on="validationListeners"
          :error-messages="errorMessage"
          class="custom-file-field"
          prepend-icon=""
          :multiple="multiple"
          :accept="accept"
          :hint="hint"
          :persistent-hint="persistentHint"
      ></v-file-input>
      <VBtn
        v-if="filePath"
        size="small"
        variant="text"
        icon="mdi-image-search"
        color="info"
        @click="()=>$emit('showFile',true)" 
      ></VBtn>
      <VBtn
        v-if="filePath"
        size="small"
        @click="()=>$emit('deleteFile',true)" 
        title="Eliminar imágen"
        variant="text"
        icon="mdi-delete-outline"
        color="error"
      ></VBtn>
    </div>
    
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  label: String,
  multiple:{
      type: Boolean,
      required: false,
      default: false
  },
  accept:{
      type: String,
      required: false,
      default: '*/*'
  },
  filePath:{
      type: String,
      required: false,
      default: null
    },
  hint: String,
  persistentHint:{
    type: Boolean,
    required: false,
    default: false
  },
});

const { errorMessage, value, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
  });

const validationListeners = {
  blur: evt => handleBlur(evt, true),
  change: handleChange,
  input: evt => handleChange(evt, !!errorMessage.value),
};

defineEmits(['deleteFile', 'showFile']);


</script> 

<style lang="scss">
.custom-file-field{
    .v-input__control .v-input__slot .v-text-field__slot .v-text-field__prefix{
        margin-top: 10px !important;
    }    

}

.custom-file-field{
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

.custom-overlay-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
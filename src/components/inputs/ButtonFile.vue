<template>
  <div>
    <v-btn 
        variant="flat"
        @click="handleFileImport"
        :icon="icon"
        :loading="loading"
    >
    </v-btn>
    <!-- Create a File Input that will be hidden but triggered with JavaScript -->
    <input 
        :name="name"
        class="d-none"
        ref="uploader" 
        type="file" 
        @change="onFileChanged"
        accept="image/*"
    >
  </div>
  <small class="text-caption text-medium-emphasis">{{ filename }}</small>
  <small class="text-caption text-warning" v-if="errors.length > 0">{{ errors.toString() }}</small>
</template>
<script setup lang="ts">
    import { useField } from 'vee-validate';


    const props = withDefaults(
        defineProps<{
            name: string;
            icon?: string;
            loading: boolean;
        }>(),
        {
            icon:'mdi-paperclip-plus',
            loading: false,
        },
    );


    const { setValue, errors } = useField(() => props.name, undefined, {
        validateOnValueUpdate: false,
    });

    const selectedFile = ref(null);
    const filename = ref('');
    const uploader = ref();



    const emit = defineEmits(['sendFile']);

    const handleFileImport=() =>  {
        uploader.value.click();
    }
    const onFileChanged = (e: any) => {
        if(e.target.files.length > 0){
            selectedFile.value = e.target.files[0];
            // filename.value = e.target.files[0].name;
            setValue(e.target.files[0]);
            emit('sendFile', true);
        }else{
            setValue(null);
            filename.value = '';
        }
    }

    onMounted(()=>{
        
    })


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
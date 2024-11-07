<template>
            <v-dialog
                v-model="value"
                max-width="600"
                :activator="activatorTarget"
            >

            <v-card
                :prepend-icon="icon"
                :title="title"
            >
                <v-card-text>
                    <slot name="form">
                    </slot>
                    <small class="text-caption text-medium-emphasis">*indicates required field</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <slot name="actions" >
                    </slot>
                    
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>
<script setup lang="ts">

const props = withDefaults(
            defineProps<{
                modelValue: boolean|undefined,
                title: string;
                activatorTarget:string;
                icon?:string;
            }>(),
            {
              title:'',
              icon:'mdi-content-save-all-outline'
            },
    );

    const value = computed({
        get() {
        return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })

    const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <VRow justify="center" align="center">
        <VCol cols="12">
            <InputsTextField
                label="Nombre"
                class="shrink"
                name="name"
                hint="- Utiliza solo letras como mínimo 3 y máximo 40 caracteres"
                persistent-hint
                required
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12">
            <InputsTextField
                label="Correo"
                class="shrink"
                name="email"
                hint="- Ingresa un correo electrónico válido (debe contener un @)"
                persistent-hint
                required
            >
            </InputsTextField>
        </VCol>
    </VRow>

    <VRow justify="center" align="center">
        <VCol cols="12">
            <InputsTextField
                label="Contraseña"
                name="password"
                type="password"
                hint="- La contraseña debe contener al menos un símbolo especial, una letra mayúscula, un número y tener una longitud mínima de 8 caracteres"
                persistent-hint
                required
            >
            </InputsTextField>
        </VCol>
    </VRow>

    <VRow justify="center" align="center">
        <VCol cols="12">
            <InputsTextField
                label="Confirmación de contraseña"
                name="password_confirmation"
                type="password"
                required
            >
            </InputsTextField>
        </VCol>
    </VRow>

</template>
<script setup lang="ts">
import { useField } from 'vee-validate';

    const props = withDefaults(
        defineProps<{
            filePath?: String | null;
        }>(),
        {
            filePath: null,
        },
    );

    const name_field = useField('name');

    watch(name_field.value, (newValue) => {
        name_field.handleChange(`${newValue}`.toUpperCase());
    });

</script>
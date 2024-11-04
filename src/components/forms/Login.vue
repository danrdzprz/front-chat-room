<template>
  <VRow>
    <VCol class="p-2">
      <InputsTextField
          label="Correo"
          name="email"
          type="email"
          autocomplete="username email"
        >
      </InputsTextField>
    </VCol>
  </VRow>

  <VRow>
    <VCol class="p-2">
      <InputsTextField
          label="Contraseña"
          name="password"
          type="password"
          autocomplete="new-password current-password"
        >
      </InputsTextField>
    </VCol>
  </VRow>
</template>
<template>
    <v-app-bar
        class="px-3"
        color="indigo-darken-3"
        height="72"
        flat
    >
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up text-muted" @click="()=> menu.toggleLeftMenu()" icon variant="plain"
                    size="small">
                    <v-icon icon="mdi-menu" ></v-icon>
                </v-btn>
            </div>
            <div class="d-flex align-center">
                <!-- User Profile -->
                <LayoutPrivateProfile/>
            </div>
        </div>
    </v-app-bar>
      
  </template>
<script setup lang="ts">
import { useMenuState } from '~/data/store/menus.store';

    const menu = useMenuState();

    const user = {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
    }
</script>
<style lang="scss">

</style>
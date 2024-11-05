<template>
    <v-app-bar
        class="px-3"
        color="indigo-darken-3"
        height="72"
        flat
    >
        <div style="width: 100vw;" class="d-flex align-center justify-center justify-md-space-between justify-sm-space-between">
            <div>
                <v-btn class="hidden-lg-and-up text-muted" @click="()=> menu.toggleLeftMenu()" icon variant="plain"
                    size="small">
                    <v-icon icon="mdi-menu" ></v-icon>
                </v-btn>
                <!-- Notification -->
                <!-- <LayoutFullVerticalHeaderNotificationDD/> -->
            </div>
    
            <v-responsive max-width="300">
            <v-text-field
                bg-color="grey-lighten-1"
                density="compact"
                rounded="pill"
                variant="solo-filled"
                flat
                hide-details
            ></v-text-field>
            </v-responsive>
        </div>
    </v-app-bar>
      
  </template>
<script setup lang="ts">
import { useMenuState } from '~/data/store/menus.store';

    definePageMeta({
        layout: 'private'
    })

    useHead({
        title: 'Chat Room'
    })

    const menu = useMenuState();

    const user = {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
    }
</script>
<style lang="scss">

</style>
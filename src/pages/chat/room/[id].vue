<template>
    <v-sheet
        class="mx-auto sticky-chat-menu"
    >   
        <div class="d-flex align-center justify-space-between">
            <h3 class="ml-5">{{ user.fullName }}</h3>
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
            <v-btn
                class="ma-2"
                color="green"
                icon="mdi-information-outline"
                variant="text"
                @click.stop="menu.toggleRightMenu()"
            ></v-btn>
        </div>
    </v-sheet>
    <ChatMessages></ChatMessages>
    <v-footer
            height="72"
            app
        >
            <v-text-field
            bg-color="grey-lighten-1"
            class="overflow-hidden"
            density="compact"
            rounded="pill"
            variant="solo-filled"
            flat
            hide-details
            ></v-text-field>
        </v-footer>
</template>
<script setup lang="ts">
import { useMenuState } from '~/data/store/menus.store';


definePageMeta({
    layout: 'private'
})

useHead({
    title: 'Chat Room'
});


const menu = useMenuState();


const user = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
}
</script>
<style lang="scss">
.sticky-chat-menu{
position: fixed;
top: 72.4px;
background-color: white;
z-index: 1;
// width: -webkit-fill-available;
// width: calc(var(--width) * .10);
// width: auto;
// width: 80%;
}
@media (max-width: 1279px) {
.sticky-chat-menu{
    width: 100vw;
}
}

@media (min-width: 1280px) {
.sticky-chat-menu{
    width: calc( 100vw - 250px );
}
}
</style>
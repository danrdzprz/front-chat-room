<template>
    <v-empty-state image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
        <template v-slot:title>
        <div class="text-subtitle-2 mt-8">
            Elijé una sala de chat para comenzar
        </div>
        </template>
    </v-empty-state>
</template>
<script setup lang="ts">

    definePageMeta({
        layout: 'private'
    })

    useHead({
        title: 'Chat Room'
    });
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
<template>
    <v-locale-provider >
        <v-app>
            <LayoutPrivateAppBar></LayoutPrivateAppBar>
            <LayoutPrivateLeftMenu></LayoutPrivateLeftMenu>
            <v-main>
                <NuxtPage />
                <!-- <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                    </div>
                </v-container> -->
            </v-main>
            <LayoutPrivateRightMenu></LayoutPrivateRightMenu>
            <!-- <v-footer
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
            </v-footer> -->
            <SharedSnackbar/>
        </v-app>

    </v-locale-provider>
</template>

<script setup lang="ts">
    import { useMeStore } from '~/data/store/auth/me.store';
    const me_store = useMeStore(); // use authenticateUser action from  auth store
    onMounted(async() => {
       await me_store.getMe();
    });
</script>
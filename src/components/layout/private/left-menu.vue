<template>
      <v-navigation-drawer width="244" floating v-model="menu.getLeftMenu">
            <template v-slot:prepend>
                <v-sheet
                    color="grey-lighten-5"
                    width="100%"
                >
                    <v-menu
                        min-width="200px"
                        rounded
                    >
                        <template v-slot:activator="{ props }">
                            <v-card variant="flat">
                            <v-card-text>
                                <div class="mx-auto text-center">
                                    <v-btn
                                        icon
                                        v-bind="props"
                                    >
                                        <v-avatar
                                        color="brown"
                                        size="large"
                                        >
                                        <span class="text-h5">{{ user.initials }}</span>
                                        </v-avatar>
                                    </v-btn>
                                <h3>{{ user.fullName }}</h3>
                                <p class="text-caption mt-1">
                                    {{ user.email }}
                                </p>
                                </div>
                            </v-card-text>
                            </v-card>
                        </template>
                        <v-card>
                        <v-card-text>
                            <div class="mx-auto text-center">
                            <v-avatar
                                color="brown"
                            >
                                <span class="text-h5">{{ user.initials }}</span>
                            </v-avatar>
                            <h3>{{ user.fullName }}</h3>
                            <p class="text-caption mt-1">
                                {{ user.email }}
                            </p>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                variant="text"
                                rounded
                            >
                                Edit Account
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                variant="text"
                                rounded
                            >
                                Disconnect
                            </v-btn>
                            </div>
                        </v-card-text>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </template>
    
            <v-list>
            <v-list-item
                v-for="n in 20"
                :key="n"
                :title="`Item ${ n }`"
                link
            ></v-list-item>
            </v-list>
            <template v-slot:append>
            <div class="pa-2">
                <v-btn block>
                Nueva sala
                </v-btn>
            </div>
            </template>
        </v-navigation-drawer>
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
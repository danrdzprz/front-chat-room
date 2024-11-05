<template>
      <v-navigation-drawer width="244" floating v-model="menu.left_menu">
            <template v-slot:prepend>
                <div class="pa-2">
                    <v-btn block color="primary">
                    Nueva sala
                    </v-btn>
                </div>
            </template>
            <v-list>
            <v-list-item
                v-for="n in 20"
                :key="n"
                :title="`Item ${ n }`"
                link
            ></v-list-item>
            </v-list>
            
        </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useMenuState } from '~/data/store/menus.store';
    
const menu = useMenuState();

</script>
<style lang="scss">

</style>
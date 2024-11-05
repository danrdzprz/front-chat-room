<template>
  
      <v-navigation-drawer 
        v-model="menu.getRightMenu"
        temporary
        location="right"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="text"
              @click.stop="menu.toggleRightMenu()"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    <!-- </v-app> -->
  </template>
<script setup lang="ts">
    import { useMenuState } from '~/data/store/menus.store';
    const menu = useMenuState();
</script>
<style lang="scss">
</style>
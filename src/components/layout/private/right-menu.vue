<template>
  
      <v-navigation-drawer 
        v-model="menu.getRightMenu"
        temporary
        location="right"
      >
        <v-list-item
          :title="store_chatroom_detail.data.name"
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

        <v-card variant="flat">
              <v-card-text>
                  <div class="mx-auto text-center">
                      <v-btn color="info" variant="outlined" block>
                          {{ $t('general.search') }}
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn color="warning"  
                          @click="()=>deleteChatRoom(store_chatroom_detail.data._id)" 
                          :loading="store_chatroom_delete.status === RequestStatus.LOADING" 
                          variant="outlined" 
                          block
                        >
                          {{ $t('general.delete') }}
                      </v-btn>
                      
                  </div>
              </v-card-text>
        </v-card>

        <!-- <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list> -->
      </v-navigation-drawer>
    <!-- </v-app> -->
  </template>
<script setup lang="ts">
    import { useCaseDeleteChatRoom } from '~/data/modules/chat-rooms/application/use-case-delete';
    import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
    import { useDeleteChatRoom } from '~/data/store/chat-room/delete.store';
    import { useDetailChatRoom } from '~/data/store/chat-room/detail.store';
    import { useMenuState } from '~/data/store/menus.store';
    const menu = useMenuState();

    const store_chatroom_detail = useDetailChatRoom();

    const store_chatroom_delete = useDeleteChatRoom();

    
    const deleteChatRoom = (id: string) =>{
      store_chatroom_delete.remove(id);
    }
    store_chatroom_delete.$subscribe((mutation, state) => {
        if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
            menu.toggleRightMenu();
            navigateTo('/chat');
        }
    });

    onUnmounted(()=>{
        store_chatroom_delete.$reset();
    })

</script>
<style lang="scss">
</style>
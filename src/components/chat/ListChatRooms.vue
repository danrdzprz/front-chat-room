<template>
  <v-infinite-scroll
    width="250"
    side="end"
    @load="(data: LoadType)=>load(data)"
  >
    <v-list>
        <template v-for="(item, index) in list_chat_room_store.list" :key="index">
            <v-list-item
                link
                :to="`/chat/${item._id}`"
                :title="`${ item.name }`" 
            ></v-list-item>
        </template>
    </v-list>
    <template v-slot:empty>
    </template>
  </v-infinite-scroll>
</template>
<script setup lang="ts">
  import type { Socket } from 'socket.io-client';
import type { DetailChatRoomDomain } from '~/data/modules/chat-rooms/domain/chat-room.domain';
import type { LoadType } from '~/data/modules/shared/domain/InfitityScrollDataType';
  import type { PaginationOptionsDomain } from '~/data/modules/shared/domain/PaginationOptions';
  import { useListChatRoom } from '~/data/store/chat-room/list.store';

    const list_chat_room_store = useListChatRoom();

    const page = ref(1);
    
    const { $io } : { $io: Socket} = useNuxtApp();


    const changeTableOptions= async (data: PaginationOptionsDomain)=>{
          const sortBy: PaginationOptionsDomain['sortBy'] = data.sortBy?.length ? data.sortBy : [{
              key: 'created_at',
              order: 'desc'
          }];
          await list_chat_room_store.getList(
          {
              ...data,
              sortBy:sortBy,
              search: '',
              columns:[]
          }
          );
    }


    const load = async (data: LoadType)  =>{
      await changeTableOptions({
            page: page.value,
            itemsPerPage: 10
      });

      page.value = page.value + 1;
      data.done('ok')

      if(list_chat_room_store.data.current_page >= list_chat_room_store.data.total_pages){
        data.done('empty')
      }

    }

    const listenNotification = () => {
        $io.on("new-chat-room", (payload: DetailChatRoomDomain) => {
          list_chat_room_store.appendToList(payload);
        });

        $io.on("delete-chat-room", (payload: DetailChatRoomDomain) => {
          console.log(payload);
          list_chat_room_store.remove(payload._id);
        });
    }

    onMounted(()=>{
        listenNotification();
    })


</script>
<template>
    <v-container class="mt-15" fluid>

        <v-infinite-scroll
            ref="messageContainer"
            direction="vertical"
            side="start"
            @load="(data: LoadType)=>load(data)"
            class="message-container"
        >
            <template v-for="(item, index) in list_message_store.list" :key="index">
                <v-row ref="itemRefs">
                    <v-col class="d-flex align-center" v-if="item.owner._id != store_user.me_data._id">
                        <v-card color="success" class="flex-none" v-bind="props" > 
                        <v-card-text class="white--text pa-2 d-flex flex-column">
                            <div class="d-flex align-center justify-space-between">
                                <span class="text-caption">{{item.owner.name}} </span>        
                                <v-btn 
                                    variant="flat" 
                                    color="success" 
                                    icon="mdi-dots-vertical" 
                                    size="x-small" 
                                    v-bind="props"
                                    :loading="store_delete_message.status === RequestStatus.LOADING" 
                                ></v-btn>
                            </div>
                            <div class="ma-4" v-if="item.file_path && item.file_url">
                                <v-img
                                    :aspect-ratio="1"
                                    :src="item.file_url"
                                    cover
                                ></v-img>
                            </div> 
                            <span class="align-self-start text-subtitle-1">{{ item.text }}</span>
                            <span class="text-caption font-italic align-self-end">{{
                                new Date(item.createdAt).toLocaleString('es-MX', {day:'numeric', month: 'long', year:'numeric', hour: '2-digit', minute:'2-digit'})
                            }}</span> 
                        </v-card-text>
                    </v-card>
                        <!-- <v-menu
                            open-on-hover
                            location="right"
                            >
                            <template v-slot:activator="{ props }">
                                <v-card color="success" class="flex-none" v-bind="props" > 
                                    <v-card-text class="white--text pa-2 d-flex flex-column">
                                        <div class="d-flex align-center justify-space-between">
                                            <span class="text-caption">{{item.owner.name}} </span>        
                                            <v-btn 
                                                variant="flat" 
                                                color="success" 
                                                icon="mdi-dots-vertical" 
                                                size="x-small" 
                                                v-bind="props"
                                                :loading="store_delete_message.status === RequestStatus.LOADING" 
                                            ></v-btn>
                                        </div>
                                        <div class="ma-4" v-if="item.file_path && item.file_url">
                                            <v-img
                                                :aspect-ratio="1"
                                                :src="item.file_url"
                                                cover
                                            ></v-img>
                                        </div> 
                                        <span class="align-self-start text-subtitle-1">{{ item.text }}</span>
                                        <span class="text-caption font-italic align-self-end">{{
                                            new Date(item.createdAt).toLocaleString('es-MX', {day:'numeric', month: 'long', year:'numeric', hour: '2-digit', minute:'2-digit'})
                                        }}</span> 
                                    </v-card-text>
                                </v-card>  
                            </template>

                                
                            </v-menu> -->
                            
                    </v-col>
                    <v-col v-else class="d-flex align-center justify-end" >

                        <v-menu
                            open-on-hover
                            location="left"
                            >
                            <template v-slot:activator="{ props }">
                                <v-card color="primary" class="flex-none">
                                    <v-card-text class="white--text pa-2 d-flex flex-column">
                                            <div class="d-flex align-center justify-space-between">
                                                <v-btn 
                                                    variant="flat" 
                                                    color="primary" 
                                                    icon="mdi-dots-vertical" 
                                                    size="x-small" 
                                                    v-bind="props"
                                                    :loading="store_delete_message.status === RequestStatus.LOADING" 
                                                ></v-btn>
                                                <small class="text-caption">{{item.owner.name}} </small>        
                                            </div>
                                            <div class="ma-4" v-if="item.file_path && item.file_url">
                                                <v-img
                                                    :aspect-ratio="1"
                                                    :src="item.file_url"
                                                    cover
                                                ></v-img>
                                            </div>                                                                           
                                            <span class="align-self-start text-subtitle-1">{{ item.text }}</span>
                                            <span class="text-caption font-italic align-self-end">{{
                                                new Date(item.createdAt).toLocaleString('es-MX', {day:'numeric', month: 'long', year:'numeric', hour: '2-digit', minute:'2-digit'})
                                            }}</span> 
                                    </v-card-text>
                                    </v-card>   
                            </template>

                                <v-card variant="flat">
                                    <v-card-text>
                                        <div class="mx-auto text-center">
                                            <v-btn color="warning"  
                                                @click="()=>store_delete_message.remove(item._id)" 
                                                :loading="store_delete_message.status === RequestStatus.LOADING" 
                                                variant="outlined" 
                                                block
                                                >
                                                {{ $t('general.delete') }}
                                            </v-btn>
                                            
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                    </v-col>
                </v-row> 
            </template>
            <template v-slot:empty>
            </template>
        </v-infinite-scroll>
    </v-container>
</template>

<script setup lang="ts">
import { useMeStore } from '~/data/store/auth/me.store';
import { useListMessage } from '~/data/store/chat-room/message/list.store';
import type { LoadType } from '~/data/modules/shared/domain/InfitityScrollDataType';
import type { PaginationOptionsDomain } from '~/data/modules/shared/domain/PaginationOptions';
import { useDeleteMessage } from '~/data/store/chat-room/message/delete.store';
import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
import type { Socket } from 'socket.io-client';
import type { DetailMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
import { debounce } from '~/utils/debounce';

const props = withDefaults(
      defineProps<{
          chatRoom: string;
      }>(),
      {
      },
);

const itemRefs = ref([]);

const messageContainer = ref();

const { $io } : { $io: Socket} = useNuxtApp();

const list_message_store = useListMessage();
const store_delete_message = useDeleteMessage();
const store_user = useMeStore();



    const page = ref(1);

    const changeTableOptions= async (data: PaginationOptionsDomain)=>{
          const sortBy: PaginationOptionsDomain['sortBy'] = data.sortBy?.length ? data.sortBy : [{
              key: 'created_at',
              order: 'desc'
          }];
          await list_message_store.getList(props.chatRoom,
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
        if(list_message_store.data.current_page >= list_message_store.data.total_pages){
            data.done('empty')
        }
    }

    const debouncedCursorToEnd = debounce(() => 
        cursorToEnd(),
		500 // timeout in ms
	);

    const cursorToEnd = ()=>{
        const scrollContainer = (messageContainer.value?.$el as HTMLDivElement);
        console.log(scrollContainer.scrollHeight);
        scrollContainer.scrollTo({top: scrollContainer.scrollHeight, behavior: 'smooth'});
    }

    const listenNotification = () => {
        if(!$io.hasListeners(`new-message-${props.chatRoom}`)){
            $io.on(`new-message-${props.chatRoom}`, (payload: DetailMessageDomain) => {
              list_message_store.appendToList(payload);
              debouncedCursorToEnd();
            });
    
            $io.on(`delete-message-${props.chatRoom}`, (payload: DetailMessageDomain) => {
              list_message_store.remove(payload._id);
            });
        }
    }

    onMounted(()=>{
        listenNotification();
    })
    onUnmounted(async() => {
        list_message_store.$reset();
    });

</script>
<style scoped>
.chat-message {
  display: unset !important;
  white-space: break-spaces;
}
.chat-screen {
  max-height: 320px;
  overflow-y: auto;
}
.flex-none {
  flex: unset;
}

.message-container{
    overflow-x: hidden;
    height: 71vh;
}

</style>
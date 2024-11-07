<template>
  <v-menu open-on-hover open-on-click v-model="menu">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="search"
        @update:modelValue="(val: string)=>searchAcc(val)"
        @click:clear="()=>search_message_store.$reset()"
        type="search"
        clearable
        density="compact"
        :placeholder="$t('general.search')"
        variant="solo"
        class="input-search"
        hide-details
        autocomplete="off"
        v-bind="props"
      >
        <template v-slot:append-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="search_message_store.status === RequestStatus.LOADING"
              color="info"
              size="24"
              indeterminate
            ></v-progress-circular>
            <v-icon v-else icon="mdi-magnify"></v-icon>

          </v-fade-transition>
        </template>
      </v-text-field>
    </template>

    <v-card variant="flat" v-if="search_message_store.data.length > 0">
        <v-card-text>
          <v-row ref="itemRefs" v-for="(item, index) in search_message_store.data">
                          <v-col class="d-flex align-center" v-if="item.owner._id != store_user.me_data._id">
                              <v-card color="success" class="flex-none" v-bind="props" > 
                              <v-card-text class="white--text pa-2 d-flex flex-column">
                                  <div class="d-flex align-center justify-space-between">
                                      <span class="text-caption">{{item.owner.name}} </span>        
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
                          </v-col>
                          <v-col v-else class="d-flex align-center justify-end" >
                            <v-card color="primary" class="flex-none">
                              <v-card-text class="white--text pa-2 d-flex flex-column">
                                      <div class="d-flex align-center justify-space-between">
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
                          </v-col>
                      </v-row> 
            
        </v-card-text>
    </v-card>
    <!-- <v-list v-if="search_message_store.data.length > 0">
      <v-list-item
        v-for="(item, index) in search_message_store.data"
        :key="index"
        :value="index"
        v-bind="props"
        :subtitle="item.owner.name"
        :title="item.text"
        @click="() => toMessage(item)"
      ></v-list-item>
    </v-list> -->
  </v-menu>

</template>

<script setup lang="ts">
  import type { DetailMessageDomain } from '~/data/modules/chat-rooms/messages/domain/message.domain';
  import { RequestStatus } from '~/data/modules/shared/domain/RequestStatus';
  import { useMeStore } from '~/data/store/auth/me.store';
  import { useSearchMessage } from '~/data/store/chat-room/message/search-store';

  const store_user = useMeStore();

  const menu = ref(false);
  const props = defineProps({
    modelValue:{
      type: String,
      required: false,
      default: ""
    },
    chatRoom:{
      type: String,
      required: false,
      default: ""
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const search = ref('');
  const search_message_store = useSearchMessage();



  const searchAcc = (val:string)=> {
    menu.value = true;
    if(val && val.length > 0 ){
      debouncedInput(val);
    }
  }

  const toMessage = (item: DetailMessageDomain) => {
    // search_value.value = search.value;
    // search_value.searching = !search_value.searching;
    // // store_product_features.$reset();
    // search.value = "";
    // store_product.$reset();
    // navigateTo(`/tienda/productos/${item.slug}/${item.product_variant_slug}?clear=1`);
  }

  const debouncedInput = debounce((value:string) => 
    search_message_store.search(props.chatRoom, {text: value}),
    500
  );
  
</script>

<style lang="scss">
   .input-search{
    .v-input__control{
        .v-field{
            box-shadow: none;
            .v-field__overlay{
              background-color: rgb(var(--v-theme-inputBackground));
              border-radius: 25px;
            }
        }
    }
    .v-field--variant-solo, .v-field--variant-solo-filled{
      background-color: transparent;
    }
   }
</style>
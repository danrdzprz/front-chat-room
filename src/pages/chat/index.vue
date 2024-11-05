<template>
    <v-app id="inspire">
  
        <v-app-bar
            class="px-3"
            color="indigo-darken-3"
            height="72"
            flat
        >
            <div style="width: 100vw;" class="d-flex align-center justify-center justify-md-space-between justify-sm-space-between">
                <div>
                    <v-btn class="hidden-lg-and-up text-muted" @click="leftDrawer = !leftDrawer" icon variant="plain"
                        size="small">
                        <v-icon icon="mdi-menu" ></v-icon>
                    </v-btn>
                    <!-- Notification -->
                    <!-- <LayoutFullVerticalHeaderNotificationDD/> -->
                </div>
        
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
            </div>
      </v-app-bar>
      <v-navigation-drawer width="244" floating v-model="leftDrawer">
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
  
     
  
      <v-main>

        <v-sheet
            class="mx-auto sticky-chat-menu"
        >   
        
        <div class="d-flex align-center justify-space-between">
                <h3 class="ml-5">{{ user.fullName }}</h3>
                <v-btn
                    class="ma-2"
                    color="green"
                    icon="mdi-information-outline"
                    variant="text"
                    @click.stop="drawer = !drawer"
                ></v-btn>
            </div>
        </v-sheet>

        <ChatMessages></ChatMessages>



      </v-main>

      
  
      <v-navigation-drawer 
        v-model="drawer"
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
              @click.stop="drawer = !drawer"
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
    </v-app>
  </template>
<script setup lang="ts">
    const drawer = ref(false);
    const leftDrawer = ref(false);
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
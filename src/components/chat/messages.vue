<template>
    <v-container class="pa-10 mt-15" fluid>
      <v-row v-for="message in messages">
                <v-col class="d-flex align-center" v-if="message.from != 'You'">
                    <div>
                        <v-card color="success" class="flex-none">                        
                          <v-card-text class="white--text pa-2 d-flex flex-column">
                            <span class="text-caption">{{message.from}} </span>                                                 
                            <span class="align-self-start text-subtitle-1">{{ message.message }}</span>
                            <span class="text-caption font-italic align-self-end">{{
                              message.time
                            }}</span> 
                          </v-card-text>
                        </v-card>      
                        <div class="arrow-left"></div>
                      </div>
                </v-col>
                <v-col v-else class="d-flex align-center justify-end" >
                  <div class="sent-message">
                      <v-card color="primary" class="flex-none">
                        <v-card-text class="white--text pa-2 d-flex flex-column">                                                                           
                          <span class="text-subtitle-1 chat-message">{{ message.message }}</span>
                          <span class="text-caption font-italic align-self-start">{{
                            message.time
                          }}</span> 
                        </v-card-text>
                      </v-card>
                    </div>
                    <div class="arrow-right"></div>
                </v-col>

      </v-row>
    </v-container>
</template>

<script setup lang="ts">

const messages =  ref([
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
    ]);

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
.received-message::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 270px;  
  right: auto;
  top: 325px;
  bottom: auto;
  border: 12px solid;
  /* border-color: #4caf50; */
  border-color: #4caf50 transparent transparent transparent;
}
.sent-message::after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;    
    right: 54px;
    top: 12px;
    bottom: auto;
    border: 12px solid;
    /* border-color: #1976d2 transparent transparent transparent; */
}

div.arrow-left::after {
    content: "";
    position: absolute;
    bottom: 8px;
    margin-left: -200px;
    width: 15px;
    height: 15px;
    background: #333;
    left: calc( 80% - 0.5em - 0.25px );
    transform: rotate( -50deg );
  }
</style>
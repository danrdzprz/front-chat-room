
import type { Socket } from 'socket.io-client';

export const useSocketStore = defineStore('SOCKET_STORE', () => {
    const { $io } : { $io: Socket} = useNuxtApp();

    // define datas
    const socket = $io;
  

    const getClient = () => {
        return socket
    }

    return {
        socket,
        getClient
    }
})
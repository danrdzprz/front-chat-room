import { io } from "socket.io-client";

//Socket Client

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');
    const socket = io(runtimeConfig.public.API_ENDPOINT, { 
        autoConnect: false,
        auth: {
            'token':`Bearer ${token.value}`
        }
    });
    return {
      provide: {
        io: socket,
      },
    };
});
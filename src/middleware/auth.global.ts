import type { Socket } from "socket.io-client";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $io } : { $io: Socket} = useNuxtApp();
    const token = useCookie('token'); // get token from cookies
    // if token doesn't exist redirect to login
    if (!token.value && to?.path.includes('chat') ) {
        abortNavigation();
        return navigateTo('/');
    }
    //try to connect to socket
    if(token.value && $io){
        if(!$io.connected){
            console.log($io);
            // $io.auth.token = `Bearer ${token.value}`;
            $io.auth = {token : `Bearer ${token.value}`};
            $io.connect();
        }
    }else{
        if($io && $io.connected){
            $io.disconnect();
        }
    }
    if (token.value && (to?.name === 'index' || to?.name === 'shop-login')) {
        abortNavigation();
        return navigateTo('/chat');
    }
})

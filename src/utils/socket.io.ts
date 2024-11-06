import io from 'socket.io-client';

const initSocket  = () => {
    const token = useCookie('token');
    const socketUrl = process.env.VUE_APP_SOCKET_IO_URL;
    const socket = io(socketUrl, { 
        autoConnect: false,
        auth: {
            'token':`${token}`
        }
    });
    return socket;
};

export default initSocket();
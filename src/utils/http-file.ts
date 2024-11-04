export const requestFile = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>{

    const runtimeConfig = useRuntimeConfig()
    const token = useCookie('token'); // useCookie new hook in nuxt 3
    const user_type = useCookie('user_type');
    const config = {...init}
    const new_headers = new Headers(config.headers); 
    
    new_headers.append("Authorization", 'Bearer ' + token.value);
    config.headers = new_headers;
    const url = `${runtimeConfig.public.API_ENDPOINT}${input}`
    return fetch(url, config).then(async function(data) {
        if (data.status === 401) {
            token.value = null;
            user_type.value = null;
        }
        return data;
    })
    
    ;
}
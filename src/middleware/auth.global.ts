
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token'); // get token from cookies
    // if token doesn't exist redirect to login
    if (!token.value && to?.path.includes('chat') ) {
        abortNavigation();
        return navigateTo('/');
    }
    if (token.value && (to?.name === 'index' || to?.name === 'shop-login')) {
        abortNavigation();
        return navigateTo('/chat');
    }
})

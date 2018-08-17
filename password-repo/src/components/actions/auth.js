export const login = (credentials) => () => 
    api.user.login(credentials).then(res => res.data.user);
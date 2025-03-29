const Token = "Vue-Token";

export const setToken = (token) => {
    localStorage.setItem(Token, token);
}
export const getToken = () => {
    return localStorage.getItem(Token);
}

export const removeToken = () => {
    localStorage.removeItem(Token);
}
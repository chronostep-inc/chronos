export const authKey = 'auth'
export const authValue = 'true'

export const getAuthKeyLocalStorage = () => {
    return localStorage.getItem(authKey)
}

export const addAuthKeyLocalStorage = () => {
    return localStorage.setItem(authKey, authValue)
}

export const removeAuthKeyLocalStorage = () => {
    return localStorage.removeItem(authKey)
}

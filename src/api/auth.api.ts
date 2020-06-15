import httpClient from './httpClient'

const endpoint = '/auth'

export const getGoogleLoginURL = () => {
    return httpClient.get<{ url: string }>(endpoint + '/google')
}

export const verifyGoogleLogin = (idToken: string) => {
    return httpClient.post<{ token: string }>(endpoint + '/verifyGoogle', { token: idToken })
}

export const logout = () => {
    return httpClient.get(endpoint + '/logout')
}

export const refresh = () => {
    return httpClient.get<{ token: string }>(endpoint + '/refresh')
}

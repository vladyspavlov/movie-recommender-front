import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '../router'

const httpClient = axios.create({
    baseURL: 'https://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})

const getAuthToken = () => localStorage.getItem('token')

const authInterceptor = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${getAuthToken()}`
    return config
}

const responseInterceptor = (res: AxiosResponse) => {
    switch (res.status) {
        case 200:
            break

        default:
            break
    }

    return res
}

const errorInterceptor = (error: AxiosError) => {
    if (!error.response) {
        //notify.warn('Network/Server error')
        return Promise.reject(error)
    }

    switch (error.response.status) {
        case 400:
            console.error(error.response.status, error.message)
            //notify.warn('Nothing to display','Data Not Found')
            break
        
        case 401: // auth error, logout user
            //notify.warn( 'Please login again', 'Session Expired')
            localStorage.removeItem('token')
            router.push('/home')
            break

        default:
            console.error(error.response.status, error.message)
            //notify.error('Server Error')
    }

    return Promise.reject(error)
}

httpClient.interceptors.request.use(authInterceptor)
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor)

export default httpClient
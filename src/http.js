import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use((request) => {
    request.headers.common['Accept'] = 'application/json'
    request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

    return request
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})

export default http;
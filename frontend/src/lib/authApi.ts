import axios from "axios"

const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_AUTH
})


export default apiAuth
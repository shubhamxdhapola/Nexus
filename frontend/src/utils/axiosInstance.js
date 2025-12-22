import axios from "axios";

export const axiosInstace = axios.create({
   baseURL : import.meta.env.VITE_SERVER_URL,
   withCredentials : true
})

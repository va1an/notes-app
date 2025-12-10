import axios from 'axios';

const API = axios.create({
    baseURL: "https://notes-app-mf1k.onrender.com",
    withCredentials: true
})

export default API;
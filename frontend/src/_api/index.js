import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Interceptor: Tambahkan Authorization header jika ada token
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default API;

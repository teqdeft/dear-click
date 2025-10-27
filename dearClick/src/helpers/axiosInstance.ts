import axios from "axios";
import { Tokenprovider } from "./TokenProvider";
import { API_URL } from "@env";

const api = axios.create({
    baseURL: API_URL,
});

// 🔥 Add token automatically before every request
api.interceptors.request.use(
    async (config) => {
        const token = await Tokenprovider();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        config.headers["Cache-Control"] = "no-cache";
        config.headers.Pragma = "no-cache";
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

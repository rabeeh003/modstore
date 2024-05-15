import axios from "axios";
import { BaseUrl } from "./constData";

const Axios = axios.create({
    baseURL: BaseUrl,
});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
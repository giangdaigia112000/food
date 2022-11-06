import axios, { AxiosRequestConfig } from "axios";
import { authorizationToken } from "src/utils/localStorage";

const axiosClient = axios.create({
    baseURL: process.env.BASE_API,
    headers: {
        accept: "application/json",
    },
    timeout: 3000,
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    config.headers = {
        authorization: authorizationToken(),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };
    return config;
});

export default axiosClient;

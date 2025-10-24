import axios from "axios";
import TokenService from "./token";
import { appUrls } from "./urls";

let URL = import.meta.env.VITE_APP_API_URL;

const apiResource = () => {

    const api = axios.create({
        baseURL: URL,
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": URL,
            "Access-Control-Allow-Credentials": true,
        },
    });
    api.interceptors.request.use(
        (config) => {
            const token = TokenService.getToken() || undefined;
            if (!token) return config;
            config.headers["Authorization"] = `Bearer ${token}`;
            if (config?.url === appUrls?.CREATE_POST_URL) {
                config.headers["Content-Type"] = "multipart/form-data";
            } else {
                config.headers["Content-Type"] = 'application/json';
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    api.interceptors.response.use(
        (response) =>
            new Promise((resolve, reject) => {
                resolve(response);
            }),
        async (error) => {
            if (error?.response?.status === 403) {
                TokenService.removeUser();
                window.location = "/";
            } else if (error?.response?.status === 401) {
                const originalConfig = error.config;
                // call refresh token
                TokenService.removeUser();
                if (originalConfig.url !== `${appUrls.LOGIN_URL}`) {
                    window.location = "/";
                }
                if (originalConfig.url !== `${appUrls.LOGIN_URL}` && error?.response) {
                    // Access Token was expired
                    if (error.response.status === 400 && !originalConfig._retry) {
                        originalConfig._retry = true;
                        const token = TokenService.getToken();
                        try {
                            const rs = await api.post([`${appUrls.REFRESHTOKEN_URL}?token=${token}`]);
                            const { accessToken } = rs;
                            TokenService.setToken(accessToken);
                            return api(originalConfig);
                        } catch (_error) {
                            return Promise.reject(_error);
                        }
                    }
                }
            } else {
                return new Promise((resolve, reject) => {
                    reject(error?.response);
                });
            }
            return Promise.reject(error?.response);
        }
    );
    return api;
};

export const api = apiResource();

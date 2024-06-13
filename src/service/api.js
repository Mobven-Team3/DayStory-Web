import axios, { AxiosHeaders } from 'axios';


const BASE_URL = 'https://talent.mobven.com:5043/api';


class Api {
    constructor() {
        if (Api._instance) {
            throw new Error('İnstance Error')
        }
        Api._instance = this;
        this.client = axios.create({ baseURL: BASE_URL });
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        )
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error);
                // switch (error.code) {
                //   case 401:

                //     break;
                //   default:
                //     break;
                // }
                return Promise.reject(error);
            }
        )
    }


    // async get<T>(url: string, params = {}): Promise<T> {
    //     const { data } = await this.client.get(url, params);
    //     return data;
    // }

    // async post<T>(url: string, payload: T, type: string): Promise<T> {
    //     const { data } = await this.client.post(url, payload, {
    //         headers: {
    //             "Content-Type": type
    //         }
    //     })
    //     return data;
    // }

    // async put<T>(url: string, payload: T, type: string): Promise<T> {
    //     const { data } = await this.client.put(url, payload, {
    //         headers: {
    //             "Content-Type": type
    //         }
    //     });
    //     return data;
    // }

    // async delete<T>(url: string): Promise<T> {
    //     const { data } = await this.client.delete(url);
    //     return data;
    // }

    async request(method, endpoint, payload, type) {
        const headers = new AxiosHeaders();
        if (type) {
            headers.setContentType(type);
        }
        const { data } = await this.client({
            method,
            url: endpoint,
            data: payload,
            headers,
        })
        return data;
    }
}

export default Api;
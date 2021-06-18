import axios, { AxiosResponse } from 'axios';

axios.interceptors.response.use(
    (res: AxiosResponse): AxiosResponse => {
        return res.data;
    },
);

class SendRequest {
    private static _instance: SendRequest = new SendRequest();
    constructor() {
        if (SendRequest._instance) {
            throw new Error('Use DataService.instance');
        }
        SendRequest._instance = this;
    }

    static get instance(): SendRequest {
        return SendRequest._instance;
    }

    get<R>(
        url: string,
        headers: any,
    ): Promise<any> {
        const reqOption = {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };
        return axios(url, reqOption).catch((error: Error): void => {
        });
    }

    post<T, R>(
        url: string,
        body: T,
        headers?: any,
    ): Promise<any> {
        body = {
            ...body,
        };
        headers = {
            'Content-Type': 'application/json',
            ...headers,
        };
        return axios
            .post(url, JSON.stringify(body), { headers })
            .catch((error: Error): void => {

            });
    }

}

export default SendRequest;

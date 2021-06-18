export interface AuthRequestDetail {
    userName: string;
    password: string;
}

export interface AuthReponseDetail {
    accessToken: string;
    isSuccess: boolean;
    errorMessage?: any;
    httpStatusCode: number;
}

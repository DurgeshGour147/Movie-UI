export interface userDetailRequest {
    accessToken: string;
}

export interface userDetailResponse {
    userId: number;
    username: string;
    roles: Role[];
    isSuccess: boolean;
    errorMessage?: any;
    httpStatusCode: number;

}

export interface Role {
    roleId: number;
    roleName: string;
}

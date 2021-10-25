export enum RequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type RequestOptions = {
    url: string;
    method: RequestMethods;
    data?: Record<string, unknown> | string | FormData;
    timeout?: number;
    withCredentials?: boolean;
    headers?: {
        [key: string]: string;
    };
};

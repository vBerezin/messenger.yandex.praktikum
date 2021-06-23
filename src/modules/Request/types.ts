export enum RequestMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RequestOptions = {
  url: string,
  method: RequestMethods,
  data?: any,
  timeout?: number,
  withCredentials?: boolean,
  headers?: {
    [ key: string ]: string,
  },
}

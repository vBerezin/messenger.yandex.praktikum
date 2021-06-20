export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Options = {
  url: string,
  method: Methods,
  data?: any,
  timeout?: number,
  withCredentials?: boolean,
  headers?: {
    [key: string]: string,
  },
}

export class Request {
  private readonly options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  send(): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const {
        url,
        data,
        headers,
        method = Methods.GET,
        timeout = Infinity,
        withCredentials = false,
      } = this.options;
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.open(method, url);
      if (headers) {
        for (const name in headers) {
          xhr.setRequestHeader(name, headers[name]);
        }
      }
      xhr.onload = function() {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

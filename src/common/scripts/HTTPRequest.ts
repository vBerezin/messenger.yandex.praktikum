import { Request, Options, Methods } from '~common/scripts/modules/Request';

type MethodOptions = Omit<Options, 'method' | 'url'>;

export const HTTPRequest = {
  async get(url: string, options?: MethodOptions): Promise<XMLHttpRequest> {
    let params = null;
    if (options && options.data) {
      const { data } = options;
      params = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
    }
    const request = new Request({
      ...options,
      url: params ? `${url}?${params}` : url,
      method: Methods.GET,
    });
    return request.send();
  },
  put(url: string, options?: MethodOptions): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: Methods.PUT,
    });
    return request.send();
  },
  delete(url: string, options?: MethodOptions): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: Methods.DELETE,
    });
    return request.send();
  },
  post(url: string, options?: MethodOptions): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: Methods.POST,
    });
    return request.send();
  },
};

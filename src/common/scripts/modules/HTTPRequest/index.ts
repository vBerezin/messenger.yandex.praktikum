import { Request} from '~common/scripts/modules/Request';
import { RequestMethods } from '~common/scripts/modules/Request/types';
import { HTTPRequestProps } from './types';

export const HTTPRequest = {
  async get(url: string, options?: HTTPRequestProps): Promise<XMLHttpRequest> {
    let params = null;
    if (options && options.data) {
      const { data } = options;
      params = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
    }
    const request = new Request({
      ...options,
      url: params ? `${url}?${params}` : url,
      method: RequestMethods.GET,
    });
    return request.send();
  },
  put(url: string, options?: HTTPRequestProps): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.PUT,
    });
    return request.send();
  },
  delete(url: string, options?: HTTPRequestProps): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.DELETE,
    });
    return request.send();
  },
  post(url: string, options?: HTTPRequestProps): Promise<XMLHttpRequest> {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.POST,
    });
    return request.send();
  },
};

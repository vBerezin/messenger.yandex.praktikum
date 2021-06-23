import { App } from '~modules/App';
import { HTTPRequest } from '~modules/HTTPRequest';

/**
 * Api - Обертка для работы с ручками
 * */

export const Api = {
  async getData<TResponse>(path: string): Promise<TResponse> {
    try {
      const request = await HTTPRequest.get(`/api${path}/index.json`);
      return JSON.parse(request.response);
    } catch (error) {
      App.debug(error);
    }
  },
};

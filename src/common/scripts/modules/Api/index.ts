import { App } from '~common/scripts/modules/App';
import { HTTPRequest } from '~common/scripts/modules/HTTPRequest';

/**
 * Api - Обертка для будущей ручки или если она изменится
 * с кешем запросов?
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

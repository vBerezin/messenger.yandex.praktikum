import { HTTP } from '~modules/HTTP';
import { ChatsResponse } from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2/chats';

export const ChatsApi = {
  async getChats(): Promise<ChatsResponse[]> {
    const request = await HTTP.get(API_URL, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
};

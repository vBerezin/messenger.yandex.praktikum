import { HTTP } from '~modules/HTTP';
import { ChatsRequest, ChatsResponse, CreateChatsRequest, CreateChatsResponse } from './types';
import { UsersRequest } from '~modules/Api/types';

const API_URL = 'https://ya-praktikum.tech/api/v2/chats';

export const ChatsApi = {
  async getChats(data?: ChatsRequest): Promise<ChatsResponse[]> {
    const request = await HTTP.get(API_URL, {
      data,
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async createChat(data: CreateChatsRequest): Promise<CreateChatsResponse> {
    const request = await HTTP.post(API_URL, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async addUsers(data: UsersRequest) {
    return HTTP.put(`${API_URL}/users`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

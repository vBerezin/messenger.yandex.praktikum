import { UsersRequest } from '~modules/Api/types';
import { HTTP } from '~modules/HTTP';

import {
  ChatsApiCreateRequest,
  ChatsApiCreateResponse,
  ChatsApiDeleteRequest,
  ChatsApiDeleteResponse,
  ChatsApiRequest,
  ChatsApiResponse,
  ChatsApiTokenResponse,
} from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2/chats';

export const ChatsApi = {
  async getChats(data?: ChatsApiRequest): Promise<ChatsApiResponse[]> {
    const request = await HTTP.get(API_URL, {
      data,
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async createChat(
    data: ChatsApiCreateRequest,
  ): Promise<ChatsApiCreateResponse> {
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
  async getToken(chatId: number): Promise<ChatsApiTokenResponse> {
    const request = await HTTP.post(`${API_URL}/token/${chatId}`, {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async deleteChat(
    data: ChatsApiDeleteRequest,
  ): Promise<ChatsApiDeleteResponse> {
    const request = await HTTP.delete(API_URL, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
};

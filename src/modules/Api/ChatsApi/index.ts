import { HTTP } from '~modules/HTTP';
import {
  ChatsTokenResponse,
  ChatSocketRequest,
  ChatsRequest,
  ChatsResponse,
  CreateChatsRequest,
  CreateChatsResponse, ChatAvatarRequest, ChatDeleteResponse, ChatDeleteRequest
} from './types';
import { UsersRequest } from '~modules/Api/types';
import { Socket } from '~modules/Socket';

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
  async getToken(chatId: number): Promise<ChatsTokenResponse> {
    const request = await HTTP.post(`${API_URL}/token/${chatId}`, {
      withCredentials: true,
      headers: {
        'accept': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async connectChat(data: ChatSocketRequest): Socket {
    const { token } = await this.getToken(data.chat.id);
    const url = `wss://ya-praktikum.tech/ws/chats/${data.user.id}/${data.chat.id}/${token}`;
    return new Socket(url);
  },
  async deleteChat(data: ChatDeleteRequest): Promise<ChatDeleteResponse> {
    const request = await HTTP.delete(API_URL, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  }
};

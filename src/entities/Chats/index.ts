import { ChatsApi } from '~modules/Api';
import {
  ChatSocketRequest,
  ChatsRequest,
  CreateChatsRequest
} from '~modules/Api/ChatsApi/types';
import { UsersRequest } from '~modules/Api/types';

export const Chats = {
  async getChats(data?: ChatsRequest) {
    return ChatsApi.getChats(data);
  },
  async createChat(data: CreateChatsRequest) {
    return ChatsApi.createChat(data);
  },
  async addUsers(data: UsersRequest) {
    return ChatsApi.addUsers(data);
  },
  connectChat(data: ChatSocketRequest) {
    return ChatsApi.connectChat(data);
  }
};

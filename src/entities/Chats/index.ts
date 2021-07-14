import { ChatsApi } from '~modules/Api';
import { ChatsRequest, CreateChatsRequest } from '~modules/Api/ChatsApi/types';
import { UsersRequest } from '~modules/Api/types';

export const Chats = {
  async getChats(data?: ChatsRequest) {
    return await ChatsApi.getChats(data);
  },
  async createChat(data: CreateChatsRequest) {
    return await ChatsApi.createChat(data);
  },
  async addUsers(data: UsersRequest) {
    return await ChatsApi.addUsers(data);
  }
};

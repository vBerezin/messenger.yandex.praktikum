import { ChatsApi } from '~modules/Api';

export const Chats = {
  async getChats() {
    return await ChatsApi.getChats();
  }
};

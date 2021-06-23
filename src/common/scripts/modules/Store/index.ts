import { StoreChat, StoreHistory, StoreUser } from './types';

import { Api } from '~common/scripts/modules/Api';

// TODO: вынести в сущности, тут только set/get

export const Store = {
  getChats() {
    return Api.getData<StoreChat[]>('/chats')
  },
  getHistory() {
    return Api.getData<StoreHistory[]>('/messages')
  },
  getUsers() {
    return Api.getData<StoreUser[]>('/users')
  },
  async getUserData(id: number): Promise<StoreUser> {
    const users = await this.getUsers();
    return users.find((user: { id: string | number; }) => Number(user.id) === id);
  },
};

import { HTTPRequest } from '~common/scripts/HTTPRequest';
import { StoreChat, StoreHistory, StoreUser } from './types';
import { App } from '~common/scripts/App';

export const Store = {
  async getData<TResponse>(path: string): Promise<TResponse> {
    try {
      const request = await HTTPRequest.get(`/data/${path}`);
      return JSON.parse(request.response);
    } catch (error) {
      App.debug(error);
    }
  },
  getChats() {
    return this.getData<StoreChat[]>('chats.json')
  },
  getHistory() {
    return this.getData<StoreHistory[]>('history.json')
  },
  getUsers() {
    return this.getData<StoreUser[]>('users.json')
  },
  async getUserData(id: number): Promise<StoreUser> {
    const users = await this.getUsers();
    return users.find((user: { id: string | number; }) => Number(user.id) === id);
  },
};

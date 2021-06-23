import { ChatsChat } from './types';

import { Api } from '~modules/Api';
import { Store } from '~modules/Store';

export const Chats = {
  async getChats() {
    const chats = Store.get('chats');
    if (!chats) {
      const data = await Api.getData<ChatsChat[]>('/chats');
      Store.set('chats', data);
    }
    return Store.get('chats');
  }
};

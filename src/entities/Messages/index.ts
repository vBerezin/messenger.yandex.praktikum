import { MessagesMessage } from './types';

import { Api } from '~modules/Api';
import { Store } from '~modules/Store';

export const Messages = {
  async getMessages() {
    const messages = Store.get('messages');
    if (!messages) {
      const data = await Api.getData<MessagesMessage[]>('/messages');
      Store.set('messages', data);
    }
    return Store.get('messages');
  }
};

import './styles';
import template from './template';
import { ChatListState } from './types';

import { Component } from '~modules/Component';
import { Store } from '~modules/Store';

const CHATS = Store.getState().chats || [];

export class ChatList extends Component<null, ChatListState> {
  constructor() {
    super({
      template,
      state: {
        chats: CHATS.map((data) => {
          return {
            id: data.id,
            title: data.title,
            image: data.avatar,
            message: data.last_message.content,
            date: data.last_message.time,
            count: data.unread_count,
          }
        }),
      }
    });
  }
}

import './styles';
import template from './template';
import { ChatListProps, ChatListState } from './types';

import { EVENTS } from '~common/scripts/events';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { App } from '~modules/App';


export class ChatList extends Component<ChatListProps, ChatListState> {
  constructor(props?: ChatListProps & ComponentProps) {
    super({ template, props });
  }

  render() {
    this.el.addEventListener('click', (event) => {
      const target = event.target.closest('[data-chat-id]');
      if (target) {
        const id = target.dataset.chatId;
        if (id !== this.state.active) {
          this.setState({ active: id });
          App.emit(EVENTS.app.messenger.chat.selected, { id });
        }
      }
    });
  }
}

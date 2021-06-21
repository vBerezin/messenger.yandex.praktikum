import './styles';
import template from './template';
import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { EVENTS } from '~common/scripts/events';
import { App } from '~common/scripts/modules/App';
import { ChatListProps, ChatListState } from './types';

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

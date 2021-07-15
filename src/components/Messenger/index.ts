import './styles';
import template from './template';
import { MessengerState } from './types';

import { Component } from '~modules/Component';

import { ChatList } from '~components/ChatList';
import { Dialog } from '~components/Dialog';
import { FormSearch } from '~components/FormSearch';

export class Messenger extends Component<null, MessengerState> {
  private search: FormSearch;
  private dialogs: Record<number, Dialog> = {};
  private chats: ChatList;

  constructor() {
    super({ template });
    this.chats = new ChatList();
    this.search = new FormSearch();
    this.search.on(this.search.events.search, (value) => {
      this.chats.search(value);
    });
    this.chats.on(this.chats.events.chatSelected, (chatData) => {
      const { id } = chatData;
      if (!this.dialogs[id]) {
        this.dialogs[id] = new Dialog({ chat: chatData });
      }
      const dialog = this.dialogs[id];
      this.setState({
        active: id,
      });
      dialog.mount(this.refs.main)
    });
  }

  mounted() {
    this.search.mount(this.refs.search);
    this.chats.mount(this.refs.list);
  }
}

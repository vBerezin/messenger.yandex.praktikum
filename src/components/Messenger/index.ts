import './styles';
import template from './template';

import { Component } from '~modules/Component';

import { ChatList } from '~components/ChatList';
import { Dialog } from '~components/Dialog';
import { FormSearch } from '~components/FormSearch';
import { MessengerState } from '~components/Messenger/types';

export class Messenger extends Component<null, MessengerState> {
  private search: FormSearch;
  private dialogs: Record<number, Dialog> = {};
  private list: ChatList;

  constructor() {
    super({ template });
    this.list = new ChatList();
    this.search = new FormSearch();
    this.search.on(this.search.events.search, (value) => {
      this.list.search(value);
    });
    this.list.on(this.list.events.chatSelected, (chatData) => {
      const { id } = chatData;
      this.search.reset();
      if (!this.dialogs[id]) {
        this.dialogs[id] = new Dialog({ chat: chatData });
      }
      const dialog = this.dialogs[id];
      dialog.on(dialog.events.chatDelete, (id) => {
        this.list.emit(this.list.events.chatDeleted, id);
        this.setState({ active: null });
        delete this.dialogs[id];
      });
      this.setState({ active: id });
      dialog.mount(this.refs.main)
    });
  }

  mounted() {
    this.search.mount(this.refs.search);
    this.list.mount(this.refs.list);
  }
}

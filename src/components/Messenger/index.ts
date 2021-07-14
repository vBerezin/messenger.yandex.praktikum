import './styles';
import template from './template';
import { MessengerProps } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { ChatList } from '~components/ChatList';
import { Dialog } from '~components/Dialog';
import { FormSearch } from '~components/FormSearch';

export class Messenger extends Component<MessengerProps> {
  private search: FormSearch;
  private dialog: Dialog;
  private chats: ChatList;

  constructor(props?: MessengerProps & ComponentProps) {
    super({template, props});
    this.dialog = new Dialog();
    this.chats = new ChatList();
    this.search = new FormSearch();
    this.search.on(this.search.events.search, (value) => {
      this.chats.search(value);
    });
    this.chats.on(this.chats.events.chatSelected, (chatData) => {
      this.dialog.openChat(chatData);
    });
  }

  mounted() {
    this.search.mount(this.el.querySelector('.messenger__search'));
    this.chats.mount(this.el.querySelector('.messenger__list'));
    this.dialog.mount(this.el.querySelector('main'));
  }
}

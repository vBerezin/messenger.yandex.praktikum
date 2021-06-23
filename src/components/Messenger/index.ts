import './styles';
import template from './template';
import { MessengerProps } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { ChatList } from '~components/ChatList';
import { FormSearch } from '~components/FormSearch';
import { Dialog } from '~components/Dialog';

export class Messenger extends Component<MessengerProps> {
  private search: FormSearch;
  private dialog: Dialog;
  private chats: ChatList;

  constructor(props?: MessengerProps & ComponentProps) {
    super({ template, props });
    this.search = new FormSearch();
    this.dialog = new Dialog();
    this.chats = new ChatList();
  }

  setChats(chats) {
    this.chats.setState({ chats });
    return this;
  }

  openChat(chat) {
    this.dialog.setState(chat);
    return this;
  }

  render() {
    this.search.mount(this.el.querySelector('.messenger__search'));
    this.chats.mount(this.el.querySelector('.messenger__list'));
    this.dialog.mount(this.el.querySelector('main'));
  }
}

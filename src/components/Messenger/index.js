import './style.scss';
import template from './template.pug';
import { Component } from 'common/scripts/modules/Component';
import { ChatList } from 'components/ChatList';
import { FormSearch } from 'components/FormSearch';
import { Dialog } from 'components/Dialog';

export class Messenger extends Component {
  constructor(props) {
    super({ template, props });
    this.search = new FormSearch();
    this.dialog = new Dialog();
    this.chatList = new ChatList({
      chats: props.chats,
    });
    this.search.on('change', ({ value }) => {
      this.chatList.filter(value);
    });
  }

  setChats(chats) {
    this.chatList.setState({ chats }).render();
    return this;
  }

  openChat(data) {
    this.dialog.setState(data).render();
    return this;
  }

  render(container) {
    super.render(container);
    this.search.render(this.el.querySelector('.messenger__search'));
    this.chatList.render(this.el.querySelector('.messenger__list'));
    this.dialog.render(this.el.querySelector('main'));
  }
}

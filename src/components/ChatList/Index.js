import './style.scss';
import template from './template.pug';
import { Component } from 'common/scripts/modules/Component';
import { EVENTS } from 'common/scripts/events';
import { App } from 'common/scripts/App';

export class ChatList extends Component {
  #chats;
  constructor(props) {
    super({ template, props });
    this.chats = props.chats;
  }

  filter(value) {
    const visible = {};
    this.chats.forEach(({ title, id }) => {
      visible[id] = value.length ? title.toLowerCase().includes(value.toLowerCase()) : true;
    });
    this.#chats.forEach((chat) => {
      const id = chat.dataset.chatId;
      chat.style.display = visible[id] ? '' : 'none';
    });
  }

  render(container) {
    super.render(container);
    this.#chats = this.el.querySelectorAll('[data-chat-id]');
    this.el.addEventListener('click', (event) => {
      const target = event.target.closest('[data-chat-id]');
      if (target) {
        const id = target.dataset.chatId;
        this.#chats.forEach((chat) => {
          chat.classList.toggle('is-active', chat === target);
        });
        if (id !== this.state.active) {
          App.emit(EVENTS.chats.selected, { id });
        }
        this.setState({ active: id });
        event.preventDefault();
      }
    });
  }
}

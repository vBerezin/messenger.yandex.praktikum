import './styles';

import { Message } from '~components/Message';
import { ChatsController } from '~controllers/Chats';
import { MessagesController } from '~controllers/Messages';
import { App } from '~modules/App';
import { Component } from '~modules/Component';

import template from './template';
import { DialogEvents, DialogProps, DialogState } from './types';

export class Dialog extends Component<DialogProps, DialogState, DialogEvents> {
    events = DialogEvents;

    private readonly chats = new ChatsController();

    private readonly messages: MessagesController;

    constructor(props: DialogProps) {
      super({
        template,
        props,
      });
      this.messages = new MessagesController({
        user: {
          id: props.user.id,
        },
        chat: {
          id: this.props.chat.id,
        },
      });
      this.messages.on(this.messages.events.received, (data) => {
        [].concat(data).forEach(this.createMessage.bind(this));
      });
      this.messages.getMessages();
    }

    private createMessage(data) {
      const isReply = data.user_id === this.props.user.id;
      const message = new Message({
        text: data.content,
        date: data.time,
        mods: isReply ? 'blue' : '',
        class: isReply ? 'dialog__reply' : 'dialog__message',
      });
      message.mount(this.refs.messages);
    }

    private async submit(event) {
      event.preventDefault();
      const form = event.target;
      const input = form.message;
      const value = input.value.trim();
      if (!value) {
        input.value = value;
        return input.focus();
      }
      await this.messages.sendMessage(value);
      input.value = '';
      return input.focus();
    }

    mounted() {
      if (this.refs.input) {
        this.refs.input.focus();
      }
      this.el.classList.remove('--actions-active');
    }

    created() {
      this.el.addEventListener('click', () => {
        this.el.classList.remove('--actions-active');
      });
      this.el.addEventListener('submit', this.submit.bind(this));
    }

    private clickActions(event) {
      event.stopPropagation();
      this.el.classList.toggle('--actions-active');
    }

    private clickDelete(event) {
      event.stopPropagation();
      const { id } = this.state.chat;
      if (!id) {
        return false;
      }
      this.chats
        .deleteChat({ id })
        .then(() => {
          this.setState({
            chat: null,
          });
          this.messages.disconnect();
          this.emit(DialogEvents.chatDelete, { id });
        })
        .catch(App.error);
    }
}

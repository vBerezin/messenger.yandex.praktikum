import './styles';
import template from './template';
import { DialogEvents, DialogProps, DialogState } from './types';

import { Component } from '~modules/Component';
import { ChatsApi } from '~modules/Api';
import { Socket } from '~modules/Socket';
import { UserProfile } from '~entities/UserProfile';
import { Messages } from '~components/Messages';
import { Chats } from '~entities/Chats';
import { App } from '~modules/App';

export class Dialog extends Component<DialogProps, DialogState, DialogEvents> {
  private socket: Socket;
  private messages = new Messages();
  events = DialogEvents;

  constructor(props: DialogProps) {
    super({
      template,
      props,
      state: props,
    });
    this.init()
      .then(() => {
        console.log(this.socket)
      });
  }

  async init() {
    const user = await UserProfile.getUser();
    this.socket = await ChatsApi.connectChat({
      user: {
        id: user.id,
      },
      chat: {
        id: this.props.chat.id
      }
    });
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
  }

  'click:actions'(event) {
    event.stopPropagation();
    this.el.classList.toggle('--actions-active');
  }

  'click:delete'(event) {
    event.stopPropagation();
    const chatId = this.state.chat?.id;
    if (!chatId) {
      return false;
    }
    Chats
      .deleteChat({ chatId })
      .then((data) => {
        this.setState({
          chat: null,
        });
        this.emit(DialogEvents.chatDelete, { id: chatId });
      })
      .catch(App.error);
  }
}

import './styles';
import template from './template';
import { DialogProps } from './types';

import { Component } from '~modules/Component';
import { ChatsApi } from '~modules/Api';
import { Socket } from '~modules/Socket';
import { UserProfile } from '~entities/UserProfile';
import { Messages } from '~components/Messages';

export class Dialog extends Component<DialogProps> {
  private socket: Socket;
  private messages = new Messages();

  constructor(props: DialogProps) {
    super({template, props});
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

  created() {
    this.el.addEventListener('submit', (event) => {
      console.log(event);
    });
  }

  mounted() {
    this.refs.input.focus();
  }
}

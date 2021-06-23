import './styles';
import template from './template';
import { DialogProps, DialogState } from './types';

import { Component } from '~common/scripts/modules/Component';
import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { EVENTS } from '~common/scripts/events';
import { App } from '~common/scripts/modules/App';
import { Validate } from '~common/scripts/modules/Validate';

import { Message } from '~components/Message';

export class Dialog extends Component<DialogProps, DialogState> {
  constructor(props?: DialogProps & ComponentProps) {
    super({ template, props });
    this.on(EVENTS.component.update, () => this.mountMessages());
    this.mountMessages();
  }

  mountMessages() {
    if (!this.state.messages) {
      return false;
    }
    const container = this.el.querySelector('.dialog__messages');
    const messages = this.state.messages.map((props) => {
      return new Message({
        ...props,
        mods: props.image ? 'image' : 'text',
        class: props.reply ? 'dialog__reply' : 'dialog__message',
      })
    });
    messages.forEach(message => message.mount(container));
  }

  render() {
    this.el.addEventListener('submit', (event) => {
      const { message } = event.target;
      const date = new Date();
      const valid = Validate.value.isEmpty(message.value);
      if (!valid) {
        event.preventDefault();
        return false;
      }
      this.setState({
        messages: [
          ...this.state.messages,
          {
            reply: true,
            text: message.value,
            date: `${date.getHours()}:${date.getSeconds()}`,
          }
        ]
      });
      App.emit(EVENTS.app.messenger.message.send, event);
      return formSubmitHandler(event);
    });
  }
}

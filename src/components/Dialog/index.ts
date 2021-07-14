import './styles';
import template from './template';
import { DialogProps, DialogState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export class Dialog extends Component<DialogProps, DialogState> {
  constructor(props?: DialogProps & ComponentProps) {
    super({template, props});
  }

  openChat(chat: ChatsResponse) {
    this.setState({ chat });
  }
}

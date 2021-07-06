import './styles';
import template from './template';
import { MessageProps, MessageState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

export class Message extends Component<MessageProps, MessageState> {
  constructor(props: MessageProps & ComponentProps) {
    super({template, props});
  }
}

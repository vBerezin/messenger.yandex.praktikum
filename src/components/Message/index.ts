import './styles';

import { Component } from '~modules/Component';

import template from './template';
import { MessageProps } from './types';

export class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    super({ template, props });
  }
}

import './styles';
import template from './template';
import { MessagesState } from './types';

import { Component } from '~modules/Component';

export class Messages extends Component<MessagesState> {
  constructor() {
    super({template});
  }
}

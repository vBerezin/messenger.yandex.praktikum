import './styles';
import template from './template';
import { ChatListState } from './types';

import { Component } from '~modules/Component';
import { Chats } from '~entities/Chats';

export class ChatList extends Component<null, ChatListState> {
  constructor() {
    super({template});
  }
}

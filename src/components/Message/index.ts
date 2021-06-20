import './styles';
import template from './template';
import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { MessageProps, MessageState} from './types';

export class Message extends Component<MessageProps, MessageState> {
  constructor(props: MessageProps & ComponentProps) {
    super({ template, props });
  }
}

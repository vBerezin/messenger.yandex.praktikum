import template from './template.pug';
import { Component } from '~common/scripts/utils/component';
import { ItemChat } from '~blocks/item-chat';

export class ListChats extends Component {
  constructor(props) {
    super({ template, props });
  }

  render(container) {
    super.render(container);
    this.props.items.map((item) => {
      const itemChat = new ItemChat(item);
      itemChat.render(this.el);
    });
  }
}

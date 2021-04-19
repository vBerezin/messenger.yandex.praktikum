import template from './template.pug';
import { Component } from '~common/scripts/utils/component';
import { ListChats } from '~blocks/list-chats';

const list = new ListChats({
  props: {
    items: [
      {},
    ],
  },
});

class PageChats extends Component {
  constructor(props) {
    super({ template, props });
  }

  render(container) {
    super.render(container);
    const aside = this.el.querySelector('aside');
  }
}

export const pageChats = new PageChats();

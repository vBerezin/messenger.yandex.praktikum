import './styles';
import template from './template';
import { ChatListEvents, ChatListState } from './types';

import { Component } from '~modules/Component';
import { Store } from '~modules/Store';
import { Chats } from '~entities/Chats';
import { App } from '~modules/App';
import { Users } from '~entities/Users';

export class ChatList extends Component<null, ChatListState, ChatListEvents> {
  events = ChatListEvents;

  constructor() {
    super({
      template,
      state: {
        active: null,
        users: [],
        chats: Store.state.chats || [],
      }
    });
    Chats
      .getChats()
      .then((chats) => {
        this.setState({ chats });
        Store.emit(Store.events.chatsUpdate, chats);
      })
      .catch(App.error);
    Store.on(Store.events.chatsUpdate, chats => this.setState({ chats }));
    this.on(ChatListEvents.chatSelected, ({ id }) => {
      this.setState({ active: id });
    });
  }

  async search(value: string) {
    if (!value) {
      return this.setState({
        chats: Store.state.chats,
        users: [],
      });
    }
    try {
      const chats = await Chats.getChats({ title: value });
      const users = await Users.search({ login: value });
      return this.setState({ chats, users });
    } catch (error) {
      return App.error(error);
    }
  }

  private clickChat(event, target) {
    const chatId = Number(target.dataset.id);
    const chatData = this.state.chats.find(chat => chat.id === chatId);
    this.emit(ChatListEvents.chatSelected, chatData);
  }

  private async clickUser(event, target) {
    const userId  = Number(target.dataset.id);
    const userData = this.state.users.find(user => user.id === userId);
    const title = `Чат с пользователем ${userData?.display_name || userData.login}`;
    try {
      const chat = await Chats.createChat({ title });
      await Chats.addUsers({
        chatId: chat.id,
        users: [ userId ],
      });
    } catch (error) {
      App.error(error);
    }
  }
}

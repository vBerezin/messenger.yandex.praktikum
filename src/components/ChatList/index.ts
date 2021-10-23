import './styles';

import { ChatsController } from '~controllers/Chats';
import { ProfileController } from '~controllers/Profile';
import { UsersController } from '~controllers/Users';
import { App } from '~modules/App';
import { Component } from '~modules/Component';

import template from './template';
import { ChatListEvents, ChatListState } from './types';

export class ChatList extends Component<null, ChatListState, ChatListEvents> {
    events = ChatListEvents;

    private readonly chats = new ChatsController();

    private readonly users = new UsersController();

    private readonly profile = new ProfileController();

    constructor() {
      super({
        template,
        state: {
          chats: [],
          users: [],
        },
      });
      this.chats
        .getChats()
        .then((chats) => {
          this.setState({ chats });
        })
        .catch(App.error);
      this.chats.on(this.chats.events.update, (chats) =>
        this.setState({ chats }),
      );
    }

    async search(value: string) {
      if (!value) {
        return this.setState({
          chats: this.chats.chats,
          users: [],
        });
      }
      try {
        const chats = await this.chats.search({ title: value });
        const users = await this.users.search({ login: value });
        this.setState({ chats, users });
      } catch (error) {
        App.error(error);
      }
    }

    clickChat(event, target) {
      const chatId = Number(target.dataset.id);
      this.setState({
        active: chatId,
      });
      const chatData = this.state.chats.find((chat) => chat.id === chatId);
      this.emit(this.events.chatSelected, chatData);
    }

    async clickUser(event, target) {
      const userId = Number(target.dataset.id);
      const profileData = await this.profile.getData();
      const userData = this.state.users.find((user) => user.id === userId);
      const userName = userData
        ? userData.display_name || userData.login
        : '';
      const profileName = profileData.display_name || profileData.login;
      const title = `Чат ${profileName} и ${userName}`;
      try {
        const newChat = await this.chats.createChat({ title });
        await this.chats.addUsers({
          chatId: newChat.id,
          users: [userId],
        });
        if (this.chats.chats) {
          const chatData = this.chats.chats.find(
            (chat) => chat.id === newChat.id,
          );
          this.setState({
            chats: this.chats.chats,
            users: [],
            active: newChat.id,
          });
          this.emit(this.events.chatSelected, chatData);
        }
      } catch (error) {
        App.error(error);
      }
    }
}

import { App } from '~modules/App';
import { EVENTS } from '~common/scripts/events';

import { Messenger } from '~components/Messenger';
import { Chats } from '~entities/Chats';
import { Users } from '~entities/Users';
import { Messages } from '~entities/Messages';

const pageMessenger = new Messenger();

(async () => {
  const DATA_CHATS = await Chats.getChats();
  const DATA_USERS = await Users.getUsers();
  const DATA_MESSAGES = await Messages.getMessages();
  const chats = DATA_CHATS.map((chat) => {
    const userData = DATA_USERS.find(user => user.id === chat.user);
    return {
      ...chat,
      title: userData.display_name,
      image: userData.image,
    };
  });
  const makeDialogData = (chatId) => {
    const history = DATA_MESSAGES.find(chat => chat.id === chatId);
    const userData = DATA_USERS.find(user => user.id === history.user);
    return {
      messages: history.messages,
      chat: {
        title: userData.display_name,
        image: userData.image,
      },
    };
  };
  pageMessenger.setChats(chats);
  App.on(EVENTS.app.messenger.chat.selected, ({id}) => {
    pageMessenger.openChat(makeDialogData(id));
  });
})();

export { pageMessenger };

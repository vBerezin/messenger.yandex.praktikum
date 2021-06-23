import { App } from '~common/scripts/modules/App';
import { EVENTS } from '~common/scripts/events';
import { Store } from '~common/scripts/modules/Store';

import { Messenger } from '~components/Messenger';

const pageMessenger = new Messenger();

(async () => {
  const DATA_CHATS = await Store.getChats();
  const DATA_USERS = await Store.getUsers();
  const DATA_HISTORY = await Store.getHistory();
  const chats = DATA_CHATS.map((chat) => {
    const userData = DATA_USERS.find(user => user.id === chat.user);
    return {
      ...chat,
      title: userData['display_name'],
      image: userData.image,
    };
  });
  const makeDialogData = (chatId) => {
    const history = DATA_HISTORY.find(chat => chat.id === chatId);
    const userData = DATA_USERS.find(user => user.id === history.user);
    return {
      messages: history.messages,
      chat: {
        title: userData['display_name'],
        image: userData.image,
      },
    };
  };
  pageMessenger.setChats(chats);
  App.on(EVENTS.app.messenger.chat.selected, ({ id }) => {
    pageMessenger.openChat(makeDialogData(id));
  });
})();

export { pageMessenger };

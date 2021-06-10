import { Messenger } from '~components/Messenger';
import { App } from '~common/scripts/App';
import { EVENTS } from '~common/scripts/events';
import { ROUTES } from '../../common/scripts/routes';
import { Store } from '~common/scripts/Store';

const pageMessenger = new Messenger({
  profile: ROUTES.user.profile.index,
});

(async () => {
  const DATA_CHATS = await Store.getChats();
  const DATA_USERS = await Store.getUsers();
  const DATA_HISTORY = await Store.getHistory();
  const chats = DATA_CHATS.map((chat) => {
    const userData = DATA_USERS.find(user => user.id === chat.user);
    return {
      ...chat,
      ...{
        title: userData.display_name,
        image: userData.image,
      },
    };
  });

  pageMessenger.setChats(chats).render();
  function makeDialogData(chatId) {
    const history = DATA_HISTORY.find(chat => chat.id === chatId);
    const userData = DATA_USERS.find(user => user.id === history.user);
    return {
      messages: history.messages,
      chat: {
        title: userData.display_name,
        image: userData.image,
      },
    };
  }

  App.on(EVENTS.chats.selected, ({ id }) => {
    pageMessenger.openChat(makeDialogData(id));
  });
})();

export { pageMessenger };

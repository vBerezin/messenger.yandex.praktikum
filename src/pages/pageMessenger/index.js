import { Messenger } from '~components/Messenger';
import { App } from '~common/scripts/App';
import { EVENTS } from '~common/scripts/events';
import DATA_CHATS from '../../../static/data/chats';
import DATA_USERS from '../../../static/data/users';
import DATA_HISTORY from '../../../static/data/history';
import { ROUTES } from '../../common/scripts/routes';

const chats = DATA_CHATS.map((chat) => {
  const userData = DATA_USERS.find(user => user.id === chat.user);
  return {
    ...chat,
    ...{
      title: userData['display_name'],
      image: userData.image,
    },
  };
});

function makeDialogData(chatId) {
  const history = DATA_HISTORY.find(chat => chat.id === chatId);
  const userData = DATA_USERS.find(user => user.id === history.user);
  return {
    messages: history.messages,
    chat: {
      title: userData['display_name'],
      image: userData.image,
    },
  };
}

const pageMessenger = new Messenger({
  chats,
  profile: ROUTES.user.profile,
});

App.on(EVENTS.chats.selected, ({ id }) => {
  pageMessenger.openChat(makeDialogData(id));
});

export { pageMessenger };

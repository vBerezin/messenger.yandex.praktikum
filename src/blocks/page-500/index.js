import { PageError } from '~blocks/page-error';
import { ROUTES } from '~common/scripts/routes';

export const page500 = new PageError({
  title: '500',
  text: 'Мы уже фиксим',
  button: {
    text: 'Назад к чатам',
    attributes: {
      href: ROUTES.chats.list,
    },
  },
});

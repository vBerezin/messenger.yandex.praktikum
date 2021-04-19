import { PageError } from '~blocks/page-error';

export const page404 = new PageError({
  title: '404',
  text: 'Не туда попали',
  button: {
    text: 'Назад к чатам',
    attributes: {
      href: '/',
    },
  },
});

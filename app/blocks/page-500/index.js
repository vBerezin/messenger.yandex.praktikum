import { PageError } from '~blocks/page-error';

export const page500 = new PageError({
  title: '500',
  text: 'Мы уже фиксим',
  button: {
    text: 'Назад к чатам',
    attributes: {
      href: '/',
    },
  },
});

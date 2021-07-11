import { ROUTES } from '~common/scripts/routes';

import { PageError } from '~components/PageError';

export const page500 = new PageError({
  title: '500',
  text: 'Мы уже фиксим',
  button: {
    mods: 'white',
    text: 'Назад к чатам',
    attributes: {
      href: ROUTES.messenger,
    },
  },
});

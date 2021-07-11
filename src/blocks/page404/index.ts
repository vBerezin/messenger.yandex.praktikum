import { ROUTES } from '~common/scripts/routes';

import { PageError } from '~components/PageError';

export const page404 = new PageError({
  title: '404',
  text: 'Не туда попали',
  button: {
    mods: 'white',
    text: 'Назад к чатам',
    attributes: {
      href: ROUTES.messenger,
    },
  },
});

import { PageError } from 'components/PageError';
import { ROUTES } from 'common/scripts/routes';

export const page404 = new PageError({
  title: '404',
  text: 'Не туда попали',
  button: {
    text: 'Назад к чатам',
    attributes: {
      href: ROUTES.messenger,
    },
  },
});

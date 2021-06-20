import 'babel-polyfill';
import './index.scss';
import { App } from '~common/scripts/App';
import { Router } from '~common/scripts/modules/Router';
import { ROUTES } from '~common/scripts/vars/routes';
import { EVENTS } from '~common/scripts/vars/events';

import { pageSignIn } from '~pages/pageSignIn';
import { pageSignUp } from '~pages/pageSignUp';
import { page500 } from '~pages/page500';
import { page404 } from '~pages/page404';
import { pageMessenger } from '~pages/pageMessenger';
import { pageProfile } from '~pages/pageProfile';

const router = new Router();

router.on(EVENTS.router.error, () => router.redirect(ROUTES.error['404']));

router.add(ROUTES.root, () => {
  if (App.user) {
    router.redirect(ROUTES.messenger);
  } else {
    router.redirect(ROUTES.auth.signin);
  }
});
router.add(ROUTES.auth.signout, () => router.redirect(ROUTES.auth.signin));
router.add(ROUTES.auth.signin, () => App.init(pageSignIn));
router.add(ROUTES.auth.signup, () => App.init(pageSignUp));
router.add(ROUTES.error['500'], () => App.init(page500));
router.add(ROUTES.error['404'], () => App.init(page404));
router.add(ROUTES.messenger, () => App.init(pageMessenger));
router.add(ROUTES.user.profile, () => {
  App.init(pageProfile);
  pageProfile.info();
});
router.add(ROUTES.user.edit, () => {
  App.init(pageProfile);
  pageProfile.edit();
});
router.add(ROUTES.user.password, () => {
  App.init(pageProfile);
  pageProfile.password();
});

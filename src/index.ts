import 'babel-polyfill';
import './index.scss';
import { App } from '~common/scripts/modules/App';
import { Router } from '~common/scripts/modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { EVENTS } from '~common/scripts/events';

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
router.add(ROUTES.auth.signin, () => {
  import('~pages/pageSignIn')
    .then(({ pageSignIn }) => App.init(pageSignIn));
});
router.add(ROUTES.auth.signup, () => {
  import('~pages/pageSignUp')
    .then(({ pageSignUp }) => App.init(pageSignUp));
});
router.add(ROUTES.error['500'], () => {
  import('~pages/page500')
    .then(({ page500 }) => App.init(page500));
});
router.add(ROUTES.error['404'], () =>{
  import('~pages/page404')
    .then(({ page404 }) => App.init(page404));
});
router.add(ROUTES.messenger, () => {
  import('~pages/pageMessenger')
    .then(({ pageMessenger }) => App.init(pageMessenger));
});
router.add(ROUTES.user.profile, () => {
  import('~pages/pageProfile')
    .then(({ pageProfile }) => App.init(pageProfile.info()));
});
router.add(ROUTES.user.edit, () => {
  import('~pages/pageProfile')
    .then(({ pageProfile }) => App.init(pageProfile.edit()));
});
router.add(ROUTES.user.password, () => {
  import('~pages/pageProfile')
    .then(({ pageProfile }) => App.init(pageProfile.password()));
});

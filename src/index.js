import 'babel-polyfill';
import './index.scss';
import { App } from 'common/scripts/App';
import { Router } from 'common/scripts/modules/Router';
import { ROUTES } from 'common/scripts/routes';
import { page500 } from 'pages/page500';
import { page404 } from 'pages/page404';
import { pageSignIn } from 'pages/pageSignIn';
import { pageSignUp } from 'pages/pageSignUp';
import { pageProfile } from 'pages/pageProfile';
import { pageMessenger } from 'pages/pageMessenger';
import { EVENTS } from 'common/scripts/events';

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
router.add(ROUTES.auth.signin, () => App.render(pageSignIn));
router.add(ROUTES.auth.signup, () => App.render(pageSignUp));
router.add(ROUTES.error['500'], () => App.render(page500));
router.add(ROUTES.error['404'], () => App.render(page404));
router.add(ROUTES.messenger, () => App.render(pageMessenger));
router.add(ROUTES.user.profile, () => App.render(pageProfile));
router.add(ROUTES.user.edit, () => {
  pageProfile.edit();
  App.render(pageProfile);
});
router.add(ROUTES.user.password, () => {
  pageProfile.password();
  App.render(pageProfile);
});

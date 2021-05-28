import './index.scss';
import { App } from '~common/scripts/app';
import { Router } from '~common/scripts/utils/router';
import { ROUTES } from '~common/scripts/routes';
import { page500 } from '~blocks/page-500';
import { page404 } from '~blocks/page-404';
import { pageSignIn } from '~blocks/page-signin';
import { pageSignUp } from '~blocks/page-signUp';
import { pageChats } from '~blocks/page-chats';
import { EVENTS } from '~common/scripts/events';

const router = new Router();

router.on(EVENTS.router.error, () => router.redirect(ROUTES.error['404']));
router.add(ROUTES.root, () => {
  if (App.user) {
    router.redirect(ROUTES.chats.list);
  } else {
    router.redirect(ROUTES.auth.signin);
  }
});
router.add(ROUTES.auth.signin, () => App.render(pageSignIn));
router.add(ROUTES.auth.signup, () => App.render(pageSignUp));
router.add(ROUTES.error['500'], () => App.render(page500));
router.add(ROUTES.error['404'], () => App.render(page404));
router.add(ROUTES.chats.list, () => App.render(pageChats));
import 'babel-polyfill';
import './index.scss';
import { App } from '~modules/App';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { Breakpoints } from '~modules/Breakpoints';
import { AuthController } from '~controllers/AuthController';
import { EVENTS } from '~common/scripts/events';
import { Store } from '~modules/Store';

Breakpoints.onchange((point) => console.info(`breakpoint: ${point}`));
App.on(EVENTS.app.error, console.log);

Router
  .use(ROUTES.auth.signout, async () => {
    try {
      await AuthController.signOut();
      return Router.go(ROUTES.auth.signin);
    } catch (e) {
      App.error(e);
      return Router.go(ROUTES.error['500']);
    }
  })
  .use(ROUTES.auth.signin, () => {
    import('~pages/pageSignIn')
      .then(({pageSignIn}) => App.init(pageSignIn, 'Авторизация'));
  })
  .use(ROUTES.auth.signup, () => {
    import('~pages/pageSignUp')
      .then(({pageSignUp}) => App.init(pageSignUp, 'Регистрация'));
  })
  .use(ROUTES.error['500'], () => {
    import('~pages/page500')
      .then(({page500}) => App.init(page500, 'Ошибка 500'));
  })
  .use(ROUTES.error['404'], () => {
    import('~pages/page404')
      .then(({page404}) => App.init(page404, 'Ошибка 404'));
  })
 /* .use(ROUTES.messenger, () => {
    import('~pages/pageMessenger')
      .then(({pageMessenger}) => App.init(pageMessenger));
  })*/
  .use(ROUTES.user.profile, () => {
    import('~pages/pageProfile')
      .then(({pageProfile}) => {
        const userName = Store.state.user.login;
        App.init(pageProfile, `Профиль пользователя ${userName}`);
      });
  })
 /* .use(ROUTES.user.edit, () => {
    import('~pages/pageProfile')
      .then(({pageProfile}) => App.init(pageProfile.edit()));
  })
  .use(ROUTES.user.password, () => {
    import('~pages/pageProfile')
      .then(({pageProfile}) => App.init(pageProfile.password()));
  })*/
  .catch((error) => {
    App.error(error);
    Router.go(ROUTES.error['404']);
  });

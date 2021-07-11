import 'babel-polyfill';
import './index.scss';
import { App } from '~modules/App';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { Breakpoints } from '~modules/Breakpoints';
import { Store } from '~modules/Store';
import { pageSignIn } from '~blocks/pageSignIn';
import { pageSignUp } from '~blocks/pageSignUp';
import { page500 } from '~blocks/page500';
import { page404 } from '~blocks/page404';
import { pageProfile } from '~blocks/pageProfile';
import { pageMessenger } from '~blocks/pageMessenger';
import { AuthController } from '~controllers/AuthController';
import { AppEvents } from '~modules/App/events';

Breakpoints.onchange((point) => console.info(`breakpoint: ${point}`));
App.on(AppEvents.error, ({error}) => {
  return Router.go(ROUTES.error['500'], error);
});

(async () => {
  const {user} = Store.state;
  Router
    .use(ROUTES.root, () => {
      if (user) {
        return Router.go(ROUTES.messenger);
      }
      return Router.go(ROUTES.auth.signin);
    })
    .use(ROUTES.auth.signin, () => App.init(pageSignIn, 'Авторизация'))
    .use(ROUTES.auth.signup, () => App.init(pageSignUp, 'Регистрация'))
    .use(ROUTES.auth.signout, async () => {
      try {
        await AuthController.signOut();
        return Router.go(ROUTES.root);
      } catch (request) {
        return Router.go(ROUTES.error['500'], request.response);
      }
    })
    .use(ROUTES.messenger, () => {
      App.init(pageMessenger, 'Мессенджер');
    })
    .use(ROUTES.user.profile, () => {
      if (!user) {
        return Router.go(ROUTES.auth.signin);
      }
      App.init(pageProfile.info(), `Профиль пользователя ${user.login}`);
    })
    .use(ROUTES.user.edit, () => {
      if (!user) {
        return Router.go(ROUTES.auth.signin);
      }
      App.init(pageProfile.edit(), `Редактирование профиля`)
    })
    .use(ROUTES.user.password, () => {
      if (!user) {
        return Router.go(ROUTES.auth.signin);
      }
      App.init(pageProfile.password(), `Смена пароля`)
    })
    .use(ROUTES.error['500'], (message) => {
      if (message) {
        page500.setState({
          text: message
        });
      }
      App.init(page500, 'Внутренняя ошибка');
    })
    .use(ROUTES.error['404'], (data) => {
      if (data?.error) {
        page404.setState({
          text: data.error
        });
      }
      App.init(page404, 'Ошибка 404');
    })
    .catch(({error, route}) => {
      if (route) {
        return Router.go(ROUTES.error['404'], {error, route});
      }
      return App.error(error);
    });
})();

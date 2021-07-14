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
import { UserProfile } from '~entities/UserProfile';

Breakpoints.onchange((point) => console.info(`breakpoint: ${point}`));
App.on(App.events.error, ({ error }) => {
  page500.setState({
    text: error,
  });
  console.error(error);
  App.init(page500, 'Внутренняя ошибка');
});

(async () => {
  const user = await UserProfile.identify();
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
      await UserProfile.signOut();
      return Router.go(ROUTES.root);
    })
    .use(ROUTES.messenger, () => {
      App.init(pageMessenger, 'Мессенджер');
    })
    .use(ROUTES.user.profile, () => {
      const userName = Store.state.profile?.login;
      App.init(pageProfile.info(), `Профиль пользователя ${userName}`);
    })
    .use(ROUTES.user.edit, () => {
      App.init(pageProfile.edit(), `Редактирование профиля`)
    })
    .use(ROUTES.user.password, () => {
      App.init(pageProfile.password(), `Смена пароля`)
    })
    .catch(({error, route}) => {
      page404.setState({
        text: error,
      });
      console.error(error);
      return App.init(page404, 'Ошибка 404');
    })
    .start();
   Router.start();
   Router.start();
   Router.start();
})();

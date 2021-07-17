import 'babel-polyfill';
import './index.scss';
import { App } from '~modules/App';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { Breakpoints } from '~modules/Breakpoints';
import { Store } from '~modules/Store';
import { page500 } from '~blocks/page500';
import { page404 } from '~blocks/page404';
import { UserProfile } from '~entities/UserProfile';

Breakpoints.onchange((point) => console.info(`breakpoint: ${point}`));
App.on(App.events.error, ({ error }) => {
  page500.setState({
    text: error.response ? error.response : error,
  });
  console.error(error);
  App.init(page500, 'Внутренняя ошибка');
});

Router
  .use(ROUTES.root, async () => {
    const user = await UserProfile.getUser();
    if (user) {
      Router.go(ROUTES.messenger);
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.auth.signin, async () => {
    const { pageSignIn } = await import('~blocks/pageSignIn');
    App.init(pageSignIn, 'Авторизация')
  })
  .use(ROUTES.auth.signup, async () => {
    const { pageSignUp } = await import('~blocks/pageSignUp');
    App.init(pageSignUp, 'Регистрация');
  })
  .use(ROUTES.auth.signout, async () => {
    await UserProfile.signOut();
    return Router.go(ROUTES.root);
  })
  .use(ROUTES.messenger, async () => {
    const user = await UserProfile.getUser();
    if (user) {
      const { pageMessenger } = await import('~blocks/pageMessenger');
      return App.init(pageMessenger, 'Мессенджер');
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.profile, async () => {
    const user = await UserProfile.getUser();
    if (user) {
      const { pageProfile } = await import('~blocks/pageProfile');
      const userName = Store.state.profile?.login;
      const title = `Профиль пользователя ${userName}`;
      return App.init(pageProfile.info(), title);
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.edit, async () => {
    const user = await UserProfile.getUser();
    if (user) {
      const { pageProfile } = await import('~blocks/pageProfile');
      return App.init(pageProfile.edit(), 'Редактирование профиля')
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.password, async () => {
    const user = await UserProfile.getUser();
    if (user) {
      const { pageProfile } = await import('~blocks/pageProfile');
      return App.init(pageProfile.password(), 'Смена пароля')
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .catch(({error, route}) => {
    page404.setState({
      text: `${error} on ${route}`,
    });
    return App.init(page404, 'Ошибка 404');
  });

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

async function checkUser() {
  const user = await UserProfile.getUser();
  if (user) {
    return user;
  }
  throw new Error(user);
}


Router
  .use(ROUTES.root, async () => {
    try {
      await checkUser();
      Router.go(ROUTES.messenger)
    } catch (error) {
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
    try {
      await checkUser();
      const { pageMessenger } = await import('~blocks/pageMessenger');
      return App.init(pageMessenger, 'Мессенджер');
    } catch (error) {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.profile, async () => {
    try {
      await checkUser();
      const { pageProfile } = await import('~blocks/pageProfile');
      const userName = Store.state.profile?.login;
      const title = `Профиль пользователя ${userName}`;
      return App.init(pageProfile.info(), title)
    } catch (error) {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.edit, async () => {
    try {
      await checkUser();
      const { pageProfile } = await import('~blocks/pageProfile');
      return App.init(pageProfile.edit(), 'Редактирование профиля')
    } catch (error) {
      Router.go(ROUTES.auth.signin);
    }
  })
  .use(ROUTES.user.password, async () => {
    try {
      await checkUser();
      const { pageProfile } = await import('~blocks/pageProfile');
      return App.init(pageProfile.password(), 'Смена пароля')
    } catch (error) {
      Router.go(ROUTES.auth.signin);
    }
  })
  .catch(({error, route}) => {
    page404.setState({
      text: `${error} on ${route}`,
    });
    return App.init(page404, 'Ошибка 404');
  });

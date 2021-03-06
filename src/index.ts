import './index.scss';

import { ROUTES } from '~common/scripts/routes';
import { ProfileController } from '~controllers/Profile';
import { App } from '~modules/App';
import { Router } from '~modules/Router';
import { page404 } from '~pages/page404';
import { page500 } from '~pages/page500';

App.on(App.events.error, ({ error }) => {
  page500.setState({
    text: error.response ? error.response : error,
  });
  console.error(error);
  App.init(page500, 'Внутренняя ошибка');
});

const profile = new ProfileController();

Router.use(ROUTES.root, async () => {
  try {
    const userData = await profile.getData();
    if (userData) {
      Router.go(ROUTES.messenger);
    } else {
      Router.go(ROUTES.auth.signin);
    }
  } catch (e) {
    Router.go(ROUTES.auth.signin);
  }
})
  .use(ROUTES.auth.signin, async () => {
    const { pageSignIn } = await import('~pages/pageSignIn');
    App.init(pageSignIn, 'Авторизация');
  })
  .use(ROUTES.auth.signup, async () => {
    const { pageSignUp } = await import('~pages/pageSignUp');
    App.init(pageSignUp, 'Регистрация');
  })
  .use(ROUTES.auth.signout, async () => {
    await profile.getData();
    return Router.go(ROUTES.root);
  })
  .use(ROUTES.messenger, async () => {
    const userData = await profile.getData();
    if (userData) {
      const { pageMessenger } = await import('~pages/pageMessenger');
      return App.init(pageMessenger, 'Мессенджер');
    }
    return Router.go(ROUTES.auth.signin);
  })
  .use(ROUTES.user.profile, async () => {
    const userData = await profile.getData();
    if (userData) {
      const { pageProfile } = await import('~pages/pageProfile');
      const userName = userData?.display_name;
      const title = `Профиль пользователя ${userName}`;
      return App.init(pageProfile.info(), title);
    }
    return Router.go(ROUTES.auth.signin);
  })
  .use(ROUTES.user.edit, async () => {
    const userData = await profile.getData();
    if (userData) {
      const { pageProfile } = await import('~pages/pageProfile');
      return App.init(pageProfile.edit(), 'Редактирование профиля');
    }
    return Router.go(ROUTES.auth.signin);
  })
  .use(ROUTES.user.password, async () => {
    const userData = await profile.getData();
    if (userData) {
      const { pageProfile } = await import('~pages/pageProfile');
      return App.init(pageProfile.password(), 'Смена пароля');
    }
    return Router.go(ROUTES.auth.signin);
  })
  .catch(({ error, route }) => {
    page404.setState({
      text: `${error} on ${route}`,
    });
    return App.init(page404, 'Ошибка 404');
  })
  .start();

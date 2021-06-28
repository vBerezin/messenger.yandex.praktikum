import 'babel-polyfill';
import './index.scss';
import { App } from '~modules/App';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { Breakpoints } from '~modules/Breakpoints';

Breakpoints.onchange((point) => App.debug(`breakpoint: ${point}`));

Router
  .add(ROUTES.root, () => {
    if (App.user) {
      Router.go(ROUTES.messenger);
    } else {
      Router.go(ROUTES.auth.signin);
    }
  })
  .add(ROUTES.auth.signout, () => Router.go(ROUTES.auth.signin))
  .add(ROUTES.auth.signin, () => {
    import('~pages/pageSignIn')
      .then(({ pageSignIn }) => App.init(pageSignIn));
  })
  .add(ROUTES.auth.signup, () => {
    import('~pages/pageSignUp')
      .then(({ pageSignUp }) => App.init(pageSignUp));
  })
  .add(ROUTES.error[ '500' ], () => {
    import('~pages/page500')
      .then(({ page500 }) => App.init(page500));
  })
  .add(ROUTES.error[ '404' ], () => {
    import('~pages/page404')
      .then(({ page404 }) => App.init(page404));
  })
  .add(ROUTES.messenger, () => {
    import('~pages/pageMessenger')
      .then(({ pageMessenger }) => App.init(pageMessenger));
  })
  .add(ROUTES.user.profile, () => {
    import('~pages/pageProfile')
      .then(({ pageProfile }) => App.init(pageProfile.info()));
  })
  .add(ROUTES.user.edit, () => {
    import('~pages/pageProfile')
      .then(({ pageProfile }) => App.init(pageProfile.edit()));
  })
  .add(ROUTES.user.password, () => {
    import('~pages/pageProfile')
      .then(({ pageProfile }) => App.init(pageProfile.password()));
  })
  .catch((error) => {
    App.debug(error);
    Router.go(ROUTES.error['404']);
  });

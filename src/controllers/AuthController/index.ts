import { AuthApi } from '~modules/Api';
import { Store } from '~modules/Store';

export const AuthController = {
  async signUp(data) {
    await AuthApi.signUp(data);
    const userData = await AuthApi.identify();
    Store.setState({user: userData});
    return userData;
  },
  async signIn(data) {
    await AuthApi.signIn(data);
    const userData = await AuthApi.identify();
    Store.setState({user: userData});
    return userData;
  },
  async signOut() {
    await AuthApi.signOut();
    Store.setState({user: null});
  },
  async identify() {
    const userData = await AuthApi.identify();
    Store.setState({ user: userData });
    return userData;
  },
};

import { AuthApi } from '~modules/Api';
import { Store } from '~modules/Store';

export const AuthController = {
  async signUp(data) {
    await AuthApi.signUp(data);
    return this.identify();
  },
  async signIn(data) {
    await AuthApi.signIn(data);
    return this.identify();
  },
  async signOut() {
    await AuthApi.signOut();
    return this.identify();
  },
  async identify() {
    const userData = await AuthApi.identify();
    Store.setState({
      user: userData
    });
    return userData;
  },
};

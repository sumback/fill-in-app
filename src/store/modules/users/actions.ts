import { userService } from '../../../services';
import { IUser } from '../../../models/user';

const actions: { [key: string]: Function } = {
  checkPseudoToSignUp(context: any, payload: { pseudo: string }) {
    return new Promise((resolve, reject) => {
      userService.findOneByPseudo(payload.pseudo, { _id: 0, password: 0 }).then(
        (response) => resolve(response),
        (error) => reject(error),
      );
    });
  },
  signUp(context: any, payload: IUser) {
    return new Promise((resolve, reject) => {
      userService.create(payload).then(
        (response) => resolve(response),
        (error) => reject(error),
      );
    });
  },
  signIn(context: any, payload: IUser) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      userService.findOneByPseudo(payload.pseudo, undefined).then(
        (response) => resolve(response),
        (error) => reject(error),
      );
    });
  },
  login(context: any, payload: IUser) {
    // create token to save authentication
    context.commit('setCurrentUser', payload);
  },
};

export default actions;

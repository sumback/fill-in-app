import Cookies from 'js-cookie';
import { userService } from '@/services';
import { IUser, UserDTO } from '@/models/user';

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
      userService.findOneByPseudo(String(payload.pseudo)).then(
        (response) => resolve(response),
        (error) => reject(error),
      );
    });
  },
  login(context: any, payload: UserDTO) {
    //FIXME replace with a jwt
    Cookies.set('currentUser', String(payload._id), { expires: 7 });
    context.commit('setCurrentUser', payload);
  },
  autoLogin(context: any) {
    return new Promise((resolve, reject) => {
      //FIXME replace with a jwt
      const id = Cookies.get('currentUser');
      if (id) {
        userService.findOneById(id).then(
          (response) => {
            context.commit('setCurrentUser', response.data.document);
            resolve(response);
          },
          (error) => reject(error),
        );
      } else {
        reject();
      }
    });
  },
  logout(context: any) {
    Cookies.remove('currentUser');
    context.commit('setCurrentUser', undefined);
  },
};

export default actions;

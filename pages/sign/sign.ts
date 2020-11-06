import { Component, Vue } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { INewUser, UserDto } from '~/models/user';

enum SignPageRoute {
  SIGN_IN = 'sign/sign-in',
  SIGN_UP = 'sign/sign-up'
}

@Component
export default class SignPage extends Vue {
  public display: SignPageRoute = SignPageRoute.SIGN_IN;
  public displayType = SignPageRoute;
  public form: INewUser = new UserDto(undefined, '');
  public sending = false;

  public submitForm(): void {
    this.sending = true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unused-vars
  public beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next((vm: SignPage) => {
      vm.display = <SignPageRoute>to.name;
    });
  }
}

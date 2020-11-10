import { AxiosResponse } from 'axios';
import { Component, Ref, Vue } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import { INewUser, UserDto } from '~/models/user';
import { $axios } from '~/utils/axios-api';

enum SignPageRoute {
  SIGN_IN = 'sign/sign-in',
  SIGN_UP = 'sign/sign-up'
}

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class SignPage extends Vue {
  public display: SignPageRoute = SignPageRoute.SIGN_IN;
  public displayType = SignPageRoute;
  public form: INewUser = new UserDto(undefined, '');
  public sending = false;
  public showErrorSnackbar = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Ref('formObs') readonly formObs!: any;

  public submitForm(): void {
    if (this.display === SignPageRoute.SIGN_UP) {
      this.createUser();
    } else if (this.display === SignPageRoute.SIGN_IN) {
      this.login();
    }
  }

  private login() {
    this.sending = true;
    $axios
      .post('/auth/login', this.form, {
        validateStatus: (status: number) => [200, 403, 404].includes(status)
      })
      .then(this.onFulfilled)
      .catch(this.onRejected);
  }

  private createUser() {
    this.sending = true;
    $axios
      .post('/users', this.form, {
        validateStatus: (status: number) => [201, 409].includes(status)
      })
      .then(this.onFulfilled)
      .catch(this.onRejected);
  }

  private onFulfilled(response: AxiosResponse) {
    switch (response.status) {
      case 200:
        // TODO redirect to home
        break;
      case 201:
        this.$router.push('login');
        break;
      case 403:
        this.formObs.setErrors({ password: [response.status] });
        break;
      case 404:
      case 409:
        this.formObs.setErrors({ pseudo: [response.status] });
        break;
    }
    this.sending = false;
  }

  private onRejected() {
    this.sending = false;
    this.showErrorSnackbar = true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unused-vars
  public beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next((vm: SignPage) => {
      vm.display = <SignPageRoute>to.name;
    });
  }
}

import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { INewUser } from '../../models/user';
import { BadRequest, NotFound } from '../../models/http-errors';

@Route('auth')
@Tags('Auth')
export class AuthenticationController extends Controller {
  @Inject
  private authService: AuthenticationService;

  @Inject
  private userService: UserService;

  @Post('login')
  public async loggingIn(@Body() requestBody: INewUser): Promise<void> {
    const resource = await this.userService.findByPseudo(requestBody.pseudo);
    if (!resource) {
      throw new NotFound();
    } else if (
      !requestBody.pseudo ||
      !requestBody.password ||
      !(await this.userService.checkPassword(
        requestBody.pseudo,
        requestBody.password
      ))
    ) {
      throw new BadRequest();
    } else {
      const tokenData = this.authService.createToken(resource);
      const cookie = this.authService.createCookie(tokenData);
      this.setHeader('Set-Cookie', cookie);
      this.setStatus(200);
    }
  }

  @Post('logout')
  public loggingOut(): void {
    this.setHeader('Set-Cookie', 'Authorization=;Max-age=0');
    this.setStatus(200);
  }
}

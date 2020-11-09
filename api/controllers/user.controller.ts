import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';
import { Inject } from 'typescript-ioc';

import { UserService } from '../services/user.service';
import { INewUser, IUpdateUser, IUser, UserDto } from '../../models/user';
import { BadRequest, Conflict, NotFound } from '../../models/http-errors';

@Route('users')
@Tags('User')
export class UserController extends Controller {
  @Inject
  private userService: UserService;

  /**
   * list all resources.
   */
  @Security('jwt')
  @Get()
  public async getAll(): Promise<Array<IUser>> {
    return await this.userService.findAll();
  }

  /**
   * get a resource by its id.
   * @param id The user's identifier
   */
  @Security('jwt')
  @Get('{id}')
  public async get(@Path() id: string): Promise<IUser | void> {
    const resource = await this.userService.findById(id);
    if (resource) {
      return resource;
    } else {
      throw new NotFound();
    }
  }

  /**
   * research a resource by its pseudo.
   * @param pseudo The user's pseudo
   */
  @Security('jwt')
  @Get('pseudo/{pseudo}')
  public async researchByPseudo(@Path() pseudo: string): Promise<IUser | void> {
    const resource = await this.userService.findByPseudo(pseudo);
    if (resource) {
      return resource;
    } else {
      throw new NotFound();
    }
  }

  /**
   * create a new resource in the list.
   */
  @Post()
  @SuccessResponse('201', 'Created')
  public async create(@Body() requestBody: INewUser): Promise<void> {
    const resource: UserDto = requestBody;
    if (!resource.pseudo || !resource.password) {
      throw new BadRequest();
    }
    if (await this.userService.findByPseudo(resource.pseudo)) {
      throw new Conflict();
    }
    await this.userService.create(resource);
    this.setStatus(201);
  }

  /**
   * update an existing resource.
   * @param id The user's identifier
   * @param requestBody The user
   */
  @Security('jwt')
  @Put('{id}')
  public async update(
    @Path() id: string,
    @Body() requestBody: IUpdateUser
  ): Promise<void> {
    const resource: UserDto = requestBody;
    if (!(await this.userService.findById(id))) {
      throw new NotFound();
    } else if (
      !resource.pseudo ||
      !resource.oldPassword ||
      !(await this.userService.checkPassword(
        resource.pseudo,
        resource.oldPassword
      ))
    ) {
      throw new BadRequest();
    } else {
      await this.userService.update(id, requestBody);
    }
  }

  /**
   * delete an existing resource.
   * @param id The user's identifier
   */
  @Security('jwt')
  @Delete('{id}')
  public async delete(@Path() id: string): Promise<void> {
    if (await this.userService.findById(id)) {
      this.setStatus(200);
      await this.userService.delete(id);
    } else {
      this.setStatus(204);
    }
  }
}

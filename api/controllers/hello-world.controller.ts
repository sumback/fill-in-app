import { Controller, Get, Route, Tags } from 'tsoa';

@Route('hello-world')
@Tags('HelloWorldController')
export class HelloWorldController extends Controller {

    @Get()
    public async index() {
        return { msg: 'Hello World!' };
    }

}
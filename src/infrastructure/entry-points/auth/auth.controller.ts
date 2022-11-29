import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { signUpDto } from './dto/auth-dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/signUp')
  signUp (@Body() payload: signUpDto) {
    return this.authService.signUp(payload);
  }

  @Post('/login')
  login (@Body() payload: signUpDto) {
    return this.authService.login(payload);
  }

  @Get('/checkToken')
  checkToken(@Req() req: any) {
    return this.authService.checkToken(req);
  }

  @Get('/private')
  @UseGuards( AuthGuard() )
  testPrivateRoute() {

    return {
      ok: true,
      msg: 'Hola mundo desde el lado privado...'
    }
  }

}

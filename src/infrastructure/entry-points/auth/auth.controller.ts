import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/auth-dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${ uuid() }.${ fileExtension }`

  callback( null, fileName );
}

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/signUp')
  signUp (@Body() payload: signUpDto ) {
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

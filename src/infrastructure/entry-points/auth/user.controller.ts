import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid'; 
import { join } from 'path';

const fileNamer = async ( req: any, file: Express.Multer.File, callback: Function ) => {
  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${ uuid() }.${ fileExtension }`

  callback( null, fileName );
}

@Controller('/user')
export class UserController implements IUserDBRepository {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/findById')
  findById(@Body() payload: any){
    const { id } = payload;
    return this.userService.findById(id);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/findByPhone')
  findByPhone(@Body() payload: any){
    const { phone } = payload;
    return this.userService.findByPhone(phone);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/findByEmail')
  findByEmail(@Body() payload: any){
    const { email } = payload;
    return this.userService.findByEmail(email);
  }

  @UseGuards( JwtAuthGuard )
  @Get('/findAll')
  findAll(){
    return this.userService.findAll();
  }

  @Put('/updatePicture/:userId')
  @UseInterceptors( FileInterceptor('profilePicture', {
    storage: diskStorage({
        filename: fileNamer,
        destination: './static/uploads',
    })
  }) )
  async updatePicture (@Param('userId') id: string, @UploadedFile() picture: Express.Multer.File, ) {

    return this.userService.updatePicture(id, picture.filename);
  }

  @Get('picture/getImage/:profilePicture')
    getImage(
        @Res() res,
        @Param('profilePicture') profilePicture: string,
    ) {
      const path = join( __dirname, '../../../../static/uploads', profilePicture );

      res.sendFile( path );
    }

  @UseGuards( JwtAuthGuard )
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

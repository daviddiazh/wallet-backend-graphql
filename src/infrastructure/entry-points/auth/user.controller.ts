import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @UseGuards( JwtAuthGuard )
  @Put('/updateRole/:id')
  updateRole(@Param('id') id: string, @Body() role: string) {
    return this.userService.updateRole(id, role);
  }

  @UseGuards( JwtAuthGuard )
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

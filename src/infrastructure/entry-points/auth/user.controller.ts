import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';

@Controller('/user')
export class UserController implements IUserDBRepository {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/findById')
  findById(@Body() payload: any){
    const { id } = payload;
    return this.userService.findById(id);
  }

  @Post('/findByName')
  findByName(@Body() payload: any){
    const { name, lastName } = payload;
    return this.userService.findByName(name, lastName);
  }

  @Post('/findByEmail')
  findByEmail(@Body() payload: any){
    const { email } = payload;
    return this.userService.findByEmail(email);
  }

  @Get('/findAll')
  findAll(){
    return this.userService.findAll();
  }

  @Put('/updateRole/:id')
  updateRole(@Param('id') id: string, @Body() role: string) {
    return this.userService.updateRole(id, role);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

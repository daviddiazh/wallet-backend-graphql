import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards( JwtAuthGuard )
  @Post('/create')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/findById')
  findById(@Body() payload: any) {
    const { id } = payload;
    return this.accountService.findById(id);
  }

  // @Get('/findById')
  // findById(@Body() id: string) {
  //   return this.accountService.findById(id);
  // }

}

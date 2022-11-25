import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/create')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

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

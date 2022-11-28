import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MovementService } from './movement.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @UseGuards( JwtAuthGuard )
  @Post('/requestCredit')
  requestCredit(@Body() payload: any) {
    return this.movementService.requestCredit(payload);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/moneyTransfer')
  moneyTransfer(@Body() payload: any) {
    return this.movementService.moneyTransfer(payload);
  }

  @UseGuards( JwtAuthGuard )
  @Post('/myMovementsByAccountId')
  myMovementsByAccountId(@Body() payload: any) {
    const { id } = payload;
    return this.movementService.myMovementsByAccountId(id);
  }

}

import { Controller, Post, Body } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('/movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post('/requestCredit')
  requestCredit(@Body() payload: any) {
    return this.movementService.requestCredit(payload);
  }

  @Post('/moneyTransfer')
  moneyTransfer(@Body() payload: any) {
    return this.movementService.moneyTransfer(payload);
  }

  @Post('/myMovementsByAccountId')
  myMovementsByAccountId(@Body() payload: any) {
    const { id } = payload;
    return this.movementService.myMovementsByAccountId(id);
  }

}

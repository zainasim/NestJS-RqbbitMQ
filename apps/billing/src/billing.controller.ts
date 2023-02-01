import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
// import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateBillingRequest } from './dto/create-billing.request';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('create')
  async createOrder(@Body() request: CreateBillingRequest) {
    console.log('zain asim');
    return await this.billingService.createBilling(request);
  }

  @Get()
  getAll() {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  async hello(data: CreateBillingRequest) {
    return await this.billingService.createBilling(data);
  }

  // @EventPattern('order_created')
  // async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
  //   this.billingService.bill(data);
  // }
}

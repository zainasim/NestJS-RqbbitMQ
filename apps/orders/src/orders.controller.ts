import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async createOrder(@Body() request: CreateOrderRequest) {
    const order = await this.ordersService.createOrder(request);
    this.client.emit('order_created', order);
    return order;
  }

  @Get('getAll')
  async getOrder() {
    this.client.emit('hello', 'Hello from RabbitMQ');
    console.log(process.env.MONGODB_URI);
    return await this.ordersService.getOrder();
  }
}

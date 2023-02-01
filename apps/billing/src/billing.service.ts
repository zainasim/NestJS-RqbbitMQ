import { Injectable } from '@nestjs/common';
import { BillingRepository } from './billing.repository';
import { CreateBillingRequest } from './dto/create-billing.request';

@Injectable()
export class BillingService {
  constructor(private readonly billingRepository: BillingRepository) {}

  // private readonly logger = new Logger(BillingService.name);

  async createBilling(request: CreateBillingRequest) {
    const order = await this.billingRepository.create(request);
    return order;
  }

  getHello(): string {
    return 'Hello World!';
  }

  // bill(data: any) {
  //   this.logger.log('Billing....', data);
  // }
}

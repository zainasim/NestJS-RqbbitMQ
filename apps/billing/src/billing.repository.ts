import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Billing } from './schema/billing.schema';

@Injectable()
export class BillingRepository extends AbstractRepository<Billing> {
  protected logger = new Logger(BillingRepository.name);

  constructor(
    @InjectModel(Billing.name) orderModel: Model<Billing>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}

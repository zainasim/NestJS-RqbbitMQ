// import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillingController } from './billing.controller';
import * as Joi from 'joi';
import { BillingService } from './billing.service';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Billing, BillingSchema } from './schema/billing.schema';
import { BillingRepository } from './billing.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      // isGlobal: true,
      // validationSchema: Joi.object({
      //   RABBIT_MQ_URI: Joi.string().required(),
      //   RABBIT_MQ_BILLING_QUEUE: Joi.string().required,
      // }),
      envFilePath: './apps/billing/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }]),
    // RmqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService, BillingRepository],
})
export class BillingModule {}

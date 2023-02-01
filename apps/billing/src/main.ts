// import { RmqService } from '@app/common';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BillingModule } from './billing.module';

async function bootstrap() {
  // const app = await NestFactory.create(BillingModule);
  // app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api');
  // const configService = app.get(ConfigService);
  // await app.listen(configService.get('PORT'));

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BillingModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'billin_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();

  // const rmqService = app.get<RmqService>(RmqService);
  // app.connectMicroservice(rmqService.getOptions('BILLING'));
  // await app.startAllMicroservices();
}
bootstrap();

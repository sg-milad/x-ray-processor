import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { DAILY_SALES_REPORT_QUEUE } from '../shared/constant/rabitmq.queue';

export const RABBITMQ_CLIENT_PROVIDER = 'EMAIL_SERVICE';

export const EmailServiceClient: ClientsProviderAsyncOptions = {
  name: RABBITMQ_CLIENT_PROVIDER,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('app.transport.urls') as string],
      queue: DAILY_SALES_REPORT_QUEUE,
      queueOptions: {
        durable: true,
      },
      persistent: true,
    },
  }),
  inject: [ConfigService],
};

export const Clients = ClientsModule.registerAsync([EmailServiceClient]);

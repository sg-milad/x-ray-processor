import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { XRAY_QUEUE } from '../shared/constant/rabitmq.queue';

export function createTransport(
  configService: ConfigService,
): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('app.transport.urls') as string],
      noAck: true,
      queue: XRAY_QUEUE,
      queueOptions: { durable: true },
    },
  };
}

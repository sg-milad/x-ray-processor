import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { RABBITMQ_CLIENT_PROVIDER } from './configs/rabbitmq.config';
import { XRAY, XRAY_QUEUE } from './shared/constant/rabitmq.queue';
import * as xrayData from './configs/x-ray.json';
@Injectable()
export class ProducerService implements OnModuleInit {
  constructor(@Inject(RABBITMQ_CLIENT_PROVIDER) private client: ClientRMQ) { }

  async onModuleInit() {
    try {
      this.sendXrayDataFromFile();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async sendXrayDataFromFile() {
    try {
      this.client.emit(XRAY, xrayData)
    } catch (error) {
      //@ToDo error handling
      console.error('Error reading or sending x-ray data:', error);
    }
  }
}

import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { RABBITMQ_CLIENT_PROVIDER } from "./configs/rabbitmq.config";
import { XRAY } from "./shared/constant/rabitmq.queue";
import * as xrayData from "./configs/x-ray.json";
@Injectable()
export class ProducerService implements OnModuleInit {
    private readonly logger = new Logger(ProducerService.name);

    constructor(@Inject(RABBITMQ_CLIENT_PROVIDER) private client: ClientRMQ) {}

    async onModuleInit() {
        this.sendXrayDataFromFile();
    }

    async sendXrayDataFromFile() {
        this.client.emit(XRAY, xrayData);
        this.logger.log("xray data sent to xray-processor");
    }
}

import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsProviderAsyncOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";
import { XRAY_QUEUE } from "../shared/constant/rabitmq.queue";

export const RABBITMQ_CLIENT_PROVIDER = "XRAY";

export const XrayServiceClient: ClientsProviderAsyncOptions = {
    name: RABBITMQ_CLIENT_PROVIDER,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
            urls: [configService.get<string>("app.transport.urls") as string],
            queue: XRAY_QUEUE,
            queueOptions: {
                durable: true,
            },
            persistent: true,
        },
    }),
    inject: [ConfigService],
};

export const Clients = ClientsModule.registerAsync([XrayServiceClient]);

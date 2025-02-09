import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { Clients } from "./configs/rabbitmq.config";
import { ConfigModule } from "@nestjs/config";
import { ConfigModuleOptions } from "./configs/config.module.options";

@Module({
    imports: [ConfigModule.forRoot(ConfigModuleOptions()), Clients],
    providers: [ProducerService],
})
export class ProducerModule {}

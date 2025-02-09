import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import swagger from "./shared/swagger";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { createTransport } from "./configs/transport.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    swagger.configure(app);

    const appConfig = app.get(ConfigService);
    await app.connectMicroservice<MicroserviceOptions>(createTransport(appConfig));
    await app.startAllMicroservices();

    await app.listen(3000);
}
bootstrap();

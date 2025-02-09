import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigModuleOptions } from "./configs/config.module.options";
import { XrayModule } from "./xray/xray.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./configs/mongoose-config.service";

@Module({
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions()),
        XrayModule,
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
    ],
})
export class AppModule {}

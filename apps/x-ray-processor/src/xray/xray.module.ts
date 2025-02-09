import { Module } from "@nestjs/common";
import { XrayController } from "./xray.controller";
import { XrayService } from "./xray.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "../configs/mongoose-config.service";
import { XRayData, XRaySchema } from "./schemas/xray.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            MongooseConfigService.forFeatureAsync([{ name: XRayData.name, schema: XRaySchema }]),
        ),
    ],
    controllers: [XrayController],
    providers: [XrayService],
})
export class XrayModule {}

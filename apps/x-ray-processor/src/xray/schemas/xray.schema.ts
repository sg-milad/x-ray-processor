import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class Coordinate {
    @Prop({ required: true })
    time: number;

    @Prop({ required: true, type: [Number] })
    position: [number, number, number]; // [x, y, speed]
}

@Schema()
export class XRayData extends Document {
    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    timestamp: number;

    @Prop({ type: [Coordinate], required: true })
    data: Coordinate[];

    @Prop()
    dataLength?: number;

    @Prop()
    dataVolume?: number;
}

export const XRaySchema = SchemaFactory.createForClass(XRayData);

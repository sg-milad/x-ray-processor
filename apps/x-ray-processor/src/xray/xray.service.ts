import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { XRayData } from "./schemas/xray.schema";
import { CreateXRayDto } from "./dto/create.xray.dto";
import { MainDto } from "./dto/xray.dto";

@Injectable()
export class XrayService {
    private readonly logger = new Logger(XrayService.name);

    constructor(@InjectModel(XRayData.name) private readonly xrayModel: Model<XRayData>) {}

    async create(createXrayDto: CreateXRayDto) {
        const createdXray = new this.xrayModel(createXrayDto);
        return await createdXray.save();
    }

    async findAll() {
        return await this.xrayModel.find().exec();
    }

    async findOne(id: string) {
        const xray = await this.xrayModel.findById(id).exec();
        if (!xray) {
            throw new NotFoundException(`Xray with ID ${id} not found`);
        }
        return xray;
    }

    async update(id: string, updateXrayDto: CreateXRayDto) {
        const updatedXray = await this.xrayModel.findByIdAndUpdate(id, updateXrayDto, { new: true }).exec();
        if (!updatedXray) {
            throw new NotFoundException(`Xray with ID ${id} not found`);
        }
        return updatedXray;
    }

    async remove(id: string) {
        const deletedXray = await this.xrayModel.findByIdAndDelete(id).exec();
        if (!deletedXray) {
            throw new NotFoundException(`Xray with ID ${id} not found`);
        }
        return deletedXray;
    }

    async processMessage(rawData: MainDto) {
        try {
            const deviceId = Object.keys(rawData)[0];
            const deviceData = rawData[deviceId];

            this.logger.log("X-ray data processed successfully", deviceId);
            if (!deviceData || !Array.isArray(deviceData.data) || !deviceData.data.length) {
                throw new BadRequestException();
            }
            const processedData = {
                deviceId,
                timestamp: deviceData.time,
                dataLength: deviceData.data.length,
                dataVolume: Buffer.byteLength(JSON.stringify(deviceData.data)),
                data: deviceData.data.map((item) => ({
                    time: item[0],
                    position: item[1], // Extract position [x, y, speed]
                })),
            };

            const createdXray = new this.xrayModel(processedData);
            await createdXray.save();

            return processedData;
        } catch (error) {
            this.logger.error("Error processing message", error.stack);
            throw new Error("Failed to process X-ray data");
        }
    }
}

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { getModelToken } from "@nestjs/mongoose";
import { XRayData } from "../src/xray/schemas/xray.schema";
import { XrayController } from "../src/xray/xray.controller";
import { XrayService } from "../src/xray/xray.service";
import { CreateXRayDto } from "../src/xray/dto/create.xray.dto";

describe("XrayController (e2e)", () => {
    let app: INestApplication;

    const mockXrayData: CreateXRayDto = {
        deviceId: "device123",
        timestamp: 1234567890,
        data: [
            { time: 1615391256, position: [10, 20, 30] },
            { time: 1615391257, position: [12, 22, 32] },
        ],
        dataLength: 2,
        dataVolume: 100,
    };

    const mockXrayService = {
        create: jest.fn().mockResolvedValue(mockXrayData),
        findAll: jest.fn().mockResolvedValue([mockXrayData]),
        findOne: jest.fn().mockResolvedValue(mockXrayData),
        remove: jest.fn().mockResolvedValue(mockXrayData),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [XrayController],
            providers: [
                {
                    provide: XrayService,
                    useValue: mockXrayService,
                },
                {
                    provide: getModelToken(XRayData.name),
                    useValue: mockXrayService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/POST xray", () => {
        return request(app.getHttpServer())
            .post("/xray")
            .send({
                deviceId: "device123",
                timestamp: 1234567890,
                data: [
                    { time: 1615391256, position: [10, 20, 30] },
                    { time: 1615391257, position: [12, 22, 32] },
                ],
            })
            .expect(201)
            .expect({
                deviceId: "device123",
                timestamp: 1234567890,
                data: [
                    { time: 1615391256, position: [10, 20, 30] },
                    { time: 1615391257, position: [12, 22, 32] },
                ],
                dataLength: 2,
                dataVolume: 100,
            });
    });

    it("/GET xray", () => {
        return request(app.getHttpServer())
            .get("/xray")
            .expect(200)
            .expect([
                {
                    deviceId: "device123",
                    timestamp: 1234567890,
                    data: [
                        { time: 1615391256, position: [10, 20, 30] },
                        { time: 1615391257, position: [12, 22, 32] },
                    ],
                    dataLength: 2,
                    dataVolume: 100,
                },
            ]);
    });

    it("/GET xray/:id", () => {
        return request(app.getHttpServer())
            .get("/xray/1")
            .expect(200)
            .expect({
                deviceId: "device123",
                timestamp: 1234567890,
                data: [
                    { time: 1615391256, position: [10, 20, 30] },
                    { time: 1615391257, position: [12, 22, 32] },
                ],
                dataLength: 2,
                dataVolume: 100,
            });
    });

    it("/DELETE xray/:id", () => {
        return request(app.getHttpServer())
            .delete("/xray/1")
            .expect(200)
            .expect({
                deviceId: "device123",
                timestamp: 1234567890,
                data: [
                    { time: 1615391256, position: [10, 20, 30] },
                    { time: 1615391257, position: [12, 22, 32] },
                ],
                dataLength: 2,
                dataVolume: 100,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

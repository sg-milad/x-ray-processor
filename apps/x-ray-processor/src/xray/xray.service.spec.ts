import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { XrayService } from "./xray.service";
import { XRayData } from "./schemas/xray.schema";
import { CreateXRayDto } from "./dto/create.xray.dto";
import { MainDto } from "./dto/xray.dto";

describe("XrayService", () => {
    let service: XrayService;
    let model: Model<XRayData>;

    const mockXRayData = {
        deviceId: "device123",
        timestamp: 1644825600000,
        data: [
            {
                time: 1644825600000,
                position: [10, 20, 5] as [number, number, number],
            },
        ],
        dataLength: 1,
        dataVolume: 100,
    };

    const mockMainDto = {
        xrayData: {
            device123: {
                data: [[1644825600000, [10, 20, 5] as [number, number, number]]],
                time: 1644825600000,
            },
        },
    } as MainDto;

    const mockModel = {
        create: jest.fn().mockResolvedValue(mockXRayData),
        find: jest.fn().mockReturnThis(),
        findById: jest.fn().mockReturnThis(),
        findByIdAndUpdate: jest.fn().mockReturnThis(),
        findByIdAndDelete: jest.fn().mockReturnThis(),
        exec: jest.fn(),
        save: jest.fn().mockResolvedValue(mockXRayData),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                XrayService,
                {
                    provide: getModelToken(XRayData.name),
                    useValue: mockModel,
                },
            ],
        }).compile();

        service = module.get<XrayService>(XrayService);
        model = module.get<Model<XRayData>>(getModelToken(XRayData.name));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("findAll", () => {
        it("should return all xray records", async () => {
            const mockXRayDataArray = [mockXRayData];
            mockModel.exec.mockResolvedValueOnce(mockXRayDataArray);

            const result = await service.findAll();

            expect(model.find).toHaveBeenCalled();
            expect(result).toEqual(mockXRayDataArray);
        });
    });

    describe("findOne", () => {
        it("should return a single xray record", async () => {
            const id = "validId";
            mockModel.exec.mockResolvedValueOnce(mockXRayData);

            const result = await service.findOne(id);

            expect(model.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(mockXRayData);
        });

        it("should throw NotFoundException when xray record is not found", async () => {
            const id = "invalidId";
            mockModel.exec.mockResolvedValueOnce(null);

            await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe("update", () => {
        it("should update an xray record", async () => {
            const id = "validId";
            const updateDto = mockXRayData;
            mockModel.exec.mockResolvedValueOnce(mockXRayData);

            const result = await service.update(id, updateDto as CreateXRayDto);

            expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDto, { new: true });
            expect(result).toEqual(mockXRayData);
        });

        it("should throw NotFoundException when xray record to update is not found", async () => {
            const id = "invalidId";
            mockModel.exec.mockResolvedValueOnce(null);

            await expect(service.update(id, mockXRayData as CreateXRayDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe("remove", () => {
        it("should delete an xray record", async () => {
            const id = "validId";
            mockModel.exec.mockResolvedValueOnce(mockXRayData);

            const result = await service.remove(id);

            expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
            expect(result).toEqual(mockXRayData);
        });

        it("should throw NotFoundException when xray record to delete is not found", async () => {
            const id = "invalidId";
            mockModel.exec.mockResolvedValueOnce(null);

            await expect(service.remove(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe("processMessage", () => {
        it("should throw error when processing invalid data", async () => {
            const invalidData = {
                xrayData: {
                    device123: {
                        data: [[]] as number[][],
                        time: 1644825600000,
                    },
                },
            } as MainDto;

            await expect(service.processMessage(invalidData)).rejects.toThrow("Failed to process X-ray data");
        });
    });
});

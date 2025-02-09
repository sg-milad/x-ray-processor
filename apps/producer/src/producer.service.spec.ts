import { Test, TestingModule } from "@nestjs/testing";
import { ProducerService } from "./producer.service";
import { ClientRMQ } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { RABBITMQ_CLIENT_PROVIDER } from "./configs/rabbitmq.config";
import { XRAY } from "./shared/constant/rabitmq.queue";
import * as xrayData from "./configs/x-ray.json";

describe("ProducerService", () => {
    let producerService: ProducerService;
    let clientRMQ: ClientRMQ;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProducerService,
                {
                    provide: RABBITMQ_CLIENT_PROVIDER,
                    useValue: {
                        emit: jest.fn(),
                    },
                },
            ],
        }).compile();

        producerService = module.get<ProducerService>(ProducerService);
        clientRMQ = module.get<ClientRMQ>(RABBITMQ_CLIENT_PROVIDER);

        jest.spyOn(Logger.prototype, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(producerService).toBeDefined();
    });

    describe("sendXrayDataFromFile", () => {
        it("should send x-ray data to the queue", async () => {
            await producerService.sendXrayDataFromFile();

            expect(clientRMQ.emit).toHaveBeenCalledWith(XRAY, xrayData);
            expect(Logger.prototype.log).toHaveBeenCalledWith("xray data sent to xray-processor");
        });
    });
});

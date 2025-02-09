import { registerAs } from "@nestjs/config";
import * as process from "process";
import { XRAY_QUEUE } from "../shared/constant/rabitmq.queue";

export default registerAs("app", () => ({
    transport: {
        urls: process.env.RABBITMQ_URL,
        queue: XRAY_QUEUE,
    },
}));

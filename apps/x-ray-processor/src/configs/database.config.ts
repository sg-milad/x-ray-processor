import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("database", () => ({
    main: {
        mongoUrl: process.env.MONGO_URI,
    },
    test: {},
}));

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsObject } from "class-validator";

class DataDto {
    @ApiProperty({ description: "Array of data points" })
    @IsArray()
    data: number[][];

    @ApiProperty({ description: "Timestamp for the data" })
    @IsNumber()
    time: number;
}

export class MainDto {
    @ApiProperty({
        description: "The X-ray data grouped by device ID",
        type: "object",
        additionalProperties: { type: "array", items: { type: "number" } },
    })
    @IsObject()
    xrayData: { [key: string]: DataDto };
}

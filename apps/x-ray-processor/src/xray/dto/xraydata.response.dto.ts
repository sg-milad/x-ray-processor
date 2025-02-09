import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

class CoordinateDto {
    @ApiProperty({ description: "Timestamp for each data point" })
    @IsNumber()
    time: number;

    @ApiProperty({ description: "Position as [x, y, speed]" })
    @IsArray()
    @IsNumber({}, { each: true })
    position: [number, number, number]; // [x, y, speed]
}

export class CreateXRayDto {
    @ApiProperty({ description: "Device identifier" })
    @IsString()
    deviceId: string;

    @ApiProperty({ description: "Timestamp for the X-ray batch" })
    @IsNumber()
    timestamp: number;

    @ApiProperty({
        description: "Array of coordinate points",
        type: [CoordinateDto],
    })
    @IsArray()
    @Type(() => CoordinateDto)
    data: CoordinateDto[];

    @ApiProperty({ description: "Number of data points", required: false })
    @IsOptional()
    @IsNumber()
    dataLength?: number;

    @ApiProperty({ description: "Size of the data in bytes", required: false })
    @IsOptional()
    @IsNumber()
    dataVolume?: number;
}

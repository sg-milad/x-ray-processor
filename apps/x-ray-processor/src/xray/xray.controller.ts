import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { XrayService } from "./xray.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MainDto } from "./dto/xray.dto";
import { EventPattern, Payload } from "@nestjs/microservices";
import { XRAY } from "../shared/constant/rabitmq.queue";
import { CreateXRayDto } from "./dto/create.xray.dto";
import { XRayData } from "./schemas/xray.schema";
import { ParseObjectIdPipe } from "../shared/pipe/parse.objectId.Pipe";

@ApiTags("Xray")
@Controller("xray")
export class XrayController {
    constructor(private readonly xrayService: XrayService) {}

    @EventPattern(XRAY)
    async eventHandler(@Payload() data: MainDto) {
        await this.xrayService.processMessage(data);
    }

    @Post()
    @ApiOperation({ summary: "Create a new Xray record" })
    @ApiResponse({
        status: 201,
        description: "The Xray record has been successfully created.",
        type: CreateXRayDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request." })
    async create(@Body() createXrayDto: CreateXRayDto): Promise<XRayData> {
        return await this.xrayService.create(createXrayDto);
    }

    @Get()
    @ApiOperation({ summary: "Get all Xray records" })
    @ApiResponse({
        status: 200,
        description: "List of Xray records.",
        type: [CreateXRayDto],
    })
    async findAll(): Promise<XRayData[]> {
        return await this.xrayService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a specific Xray record by ID" })
    @ApiResponse({
        status: 200,
        description: "The Xray record has been successfully found.",
        type: CreateXRayDto,
    })
    @ApiResponse({ status: 404, description: "Xray record not found." })
    async findOne(@Param("id", ParseObjectIdPipe) id: string): Promise<XRayData> {
        return await this.xrayService.findOne(id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update an existing Xray record" })
    @ApiResponse({
        status: 200,
        description: "The Xray record has been successfully updated.",
        type: CreateXRayDto,
    })
    @ApiResponse({ status: 404, description: "Xray record not found." })
    async update(@Param("id", ParseObjectIdPipe) id: string, @Body() updateXrayDto: CreateXRayDto): Promise<XRayData> {
        return await this.xrayService.update(id, updateXrayDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete an Xray record by ID" })
    @ApiResponse({
        status: 200,
        description: "The Xray record has been successfully deleted.",
        type: CreateXRayDto,
    })
    @ApiResponse({ status: 404, description: "Xray record not found." })
    async remove(@Param("id", ParseObjectIdPipe) id: string): Promise<XRayData> {
        return await this.xrayService.remove(id);
    }
}

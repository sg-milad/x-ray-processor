
export class DataDto {
    data: any[][];

    time: number;
}

export class MainDto {
    [key: string]: DataDto;
}

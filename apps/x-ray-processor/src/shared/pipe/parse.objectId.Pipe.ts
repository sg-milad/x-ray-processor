import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from '../helper/helper';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`);
    }
    return value;
  }
}

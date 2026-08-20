import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class PositiveIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number;
}

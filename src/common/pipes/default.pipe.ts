import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DefaultPipe implements PipeTransform {
    constructor(private readonly defValue: string) {}

    transform(value: string) {
        return value === undefined ? this.defValue : value;
    }
}

import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    ParseIntPipe,
    Query,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { DefaultPipe } from '../common/pipes/default.pipe';
import { makeUrl } from '../common/utils';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async getPaginated(
        @Req() req: Request,
        @Query('limit', new DefaultPipe('20'), ParseIntPipe) limit: number,
        @Query('offset', new DefaultPipe('0'), ParseIntPipe) page: number,
    ) {
        const nextUrl = makeUrl(req, { limit, offset: page + 1 });
        const [users, total] = await this.usersService.fetchPaginated(
            page,
            limit,
        );
        const hasNext = total > page * limit + users.length;
        return { users, next: hasNext ? nextUrl : undefined };
    }
}

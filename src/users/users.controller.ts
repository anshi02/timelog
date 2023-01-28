import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import * as querystring from 'querystring';
import { DefaultPipe } from 'src/common/pipes/default.pipe';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async getPaginated(
        @Query('limit', new DefaultPipe('20'), ParseIntPipe) limit: number,
        @Query('offset', new DefaultPipe('0'), ParseIntPipe) page: number,
    ) {
        const query = querystring.stringify({ limit, offset: page + 1 });
        const nextUrl = `/users?${query}`;
        const [users, count] = await this.usersService.fetchPaginated(
            page,
            limit,
        );
        const hasNext = count > page * limit + users.length;
        return { users, next: hasNext ? nextUrl : undefined };
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.fetchOne(id);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @Patch('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() userDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, userDto);
    }
}

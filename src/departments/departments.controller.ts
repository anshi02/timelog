import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    ParseIntPipe,
    Patch,
    Post,
    Param,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserToken } from '../auth/contracts/user-token.contract';
import { JwtUser } from '../common/decorators/user.decorator';
import { DefaultPipe } from '../common/pipes/default.pipe';
import { makeUrl } from '../common/utils';
import CreateDepartmentDto from './dto/create-department.dto';
import UpdateDepartmentDto from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchPaginated(
        @Req() req: Request,
        @JwtUser() token: UserToken,
        @Query('limit', new DefaultPipe('20'), ParseIntPipe) limit: number,
        @Query('offset', new DefaultPipe('0'), ParseIntPipe) page: number,
        // @Query('detailed', new DefaultPipe('false'), ParseBoolPipe)
        // detailed: boolean,
    ) {
        const nextUrl = makeUrl(req, { limit, offset: page + 1 });
        const [departments, total] =
            await this.departmentsService.fetchPaginated(
                token.userId,
                limit,
                page,
            );
        const hasNext = total > page * limit + departments.length;
        return { departments, next: hasNext ? nextUrl : undefined };
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchOne(@Param('id') departmentId: number) {
        return await this.departmentsService.fetchOne(departmentId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Body() departmentDto: CreateDepartmentDto,
    ) {
        return await this.departmentsService.create(userId, departmentDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) departmentId: number,
        @Body() departmentDto: UpdateDepartmentDto,
    ) {
        return await this.departmentsService.update(
            userId,
            departmentId,
            departmentDto,
        );
    }
}

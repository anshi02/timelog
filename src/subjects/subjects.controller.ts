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
import CreateSubjectDto from './dto/create-subject.dto';
import UpdateSubjectDto from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

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
        const [subjects, total] = await this.subjectsService.fetchPaginated(
            token.userId,
            limit,
            page,
        );
        const hasNext = total > page * limit + subjects.length;
        return { subjects, next: hasNext ? nextUrl : undefined };
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchOne(@Param('id') subjectId: number) {
        return await this.subjectsService.fetchOne(subjectId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Body() subjectDto: CreateSubjectDto,
    ) {
        return await this.subjectsService.create(userId, subjectDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) subjectId: number,
        @Body() subjectDto: UpdateSubjectDto,
    ) {
        return await this.subjectsService.update(userId, subjectId, subjectDto);
    }
}

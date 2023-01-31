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
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserToken } from 'src/auth/contracts/user-token.contract';
import { JwtUser } from 'src/common/decorators/user.decorator';
import { DefaultPipe } from 'src/common/pipes/default.pipe';
import { makeUrl } from 'src/common/utils';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

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
        const [projects, total] = await this.projectsService.fetchPaginated(
            token.userId,
            limit,
            page,
        );
        const hasNext = total > page * limit + projects.length;
        return { projects, next: hasNext ? nextUrl : undefined };
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchOne(@Param('id') projectId: number) {
        return await this.projectsService.fetchOne(projectId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Body() projectDto: CreateProjectDto,
    ) {
        return await this.projectsService.create(userId, projectDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) projectId: number,
        @Body() projectDto: UpdateProjectDto,
    ) {
        return await this.projectsService.update(userId, projectId, projectDto);
    }
}

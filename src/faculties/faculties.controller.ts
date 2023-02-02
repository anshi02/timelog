import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    ParseIntPipe,
    Patch,
    Post,
    Param,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { JwtUser } from '../common/decorators/user.decorator';
import CreateFacultyDto from './dto/create-faculty.dto';
import UpdateFacultyDto from './dto/update-faculty.dto';
import { FacultyService } from './faculties.service';

@Controller('faculties')
@UseGuards(JwtAuthGuard)
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchOne(@Param('id') facultyId: number) {
        return await this.facultyService.fetchOne(facultyId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Body() facultyDto: CreateFacultyDto,
    ) {
        return await this.facultyService.create(userId, facultyDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) facultyId: number,
        @Body() facultyDto: UpdateFacultyDto,
    ) {
        return await this.facultyService.update(userId, facultyId, facultyDto);
    }
}

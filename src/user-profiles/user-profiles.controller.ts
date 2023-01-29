import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import CreateUserProfileDto from './dto/create-user-profile.dto';
import UpdateUserProfileDto from './dto/update-user-profile.dto';
import { UserProfilesService } from './user-profiles.service';

@Controller('/users/:userId/profile')
export class UserProfilesController {
    constructor(private readonly profilesService: UserProfilesService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    fetchForUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.profilesService.fetchForUser(userId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async createForUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() profileDto: CreateUserProfileDto,
    ) {
        return await this.profilesService.create(userId, profileDto);
    }

    @Patch()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateForUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() profileDto: UpdateUserProfileDto,
    ) {
        return await this.profilesService.update(userId, profileDto);
    }
}

import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthUser, JwtUser } from '../common/decorators/user.decorator';
import CreateUserDto from '../users/dto/create-user.dto';
import UpdateUserDto from '../users/dto/update-user.dto';
import User from '../users/entities/user.entity';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async fetchCurrentUser(@JwtUser('userId', ParseIntPipe) userId: number) {
        return await this.authService.getUser(userId);
    }

    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.createUser(userDto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@AuthUser() user: User) {
        return { accessToken: this.authService.getSignedJwt(user) };
    }

    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async changePassword(
        @JwtUser('userId', ParseIntPipe) userId: number,
        @Body() userDto: UpdateUserDto,
    ) {
        return this.authService.updateUser(userId, userDto);
    }

    @Delete('delete-account')
    @UseGuards(JwtAuthGuard)
    async deleteAccount(@JwtUser('userId', ParseIntPipe) userId: number) {
        await this.authService.deleteUser(userId);
    }
}

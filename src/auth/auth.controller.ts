import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/user.decorator';
import User from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@AuthUser() user: User) {
        return { accessToken: this.authService.getSignedJwt(user) };
    }
}

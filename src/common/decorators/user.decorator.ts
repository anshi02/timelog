import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import User from 'src/users/entities/user.entity';

export const AuthUser = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: User | undefined = request.user;
        return data ? user?.[data] : user;
    },
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserToken } from 'src/auth/contracts/user-token.contract';
import User from 'src/users/entities/user.entity';

export const AuthUser = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: User | undefined = request.user;
        return data ? user?.[data] : user;
    },
);

export const JwtUser = createParamDecorator(
    (data: keyof UserToken | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const token: UserToken | undefined = request.user;
        return data ? token?.[data] : token;
    },
);

import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MaxLength,
    IsOptional,
} from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @MaxLength(64)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    lastName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    bio?: string;
}

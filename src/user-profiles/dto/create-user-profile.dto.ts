import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export default class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    @IsNotEmpty()
    bio?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    picPath?: string;
}

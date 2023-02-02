import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}

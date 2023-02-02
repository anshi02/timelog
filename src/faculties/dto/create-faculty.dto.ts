import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class CreateFacultyDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    code: string;
}

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}

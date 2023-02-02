import { PartialType } from '@nestjs/mapped-types';
import CreateFacultyDto from './create-faculty.dto';

const PartialDto = PartialType(CreateFacultyDto);
export default class UpdateFacultyDto extends PartialDto {}

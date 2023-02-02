import { PartialType } from '@nestjs/mapped-types';
import CreateDepartmentDto from './create-department.dto';

const PartialDto = PartialType(CreateDepartmentDto);
export default class UpdateDepartmentDto extends PartialDto {}

import { PartialType } from '@nestjs/mapped-types';
import CreateProjectDto from './create-project.dto';

const PartialDto = PartialType(CreateProjectDto);
export default class UpdateProjectDto extends PartialDto {}

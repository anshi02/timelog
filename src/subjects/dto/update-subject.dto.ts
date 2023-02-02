import { PartialType } from '@nestjs/mapped-types';
import CreateSubjectDto from './create-subject.dto';

const PartialDto = PartialType(CreateSubjectDto);
export default class UpdateProjectDto extends PartialDto {}

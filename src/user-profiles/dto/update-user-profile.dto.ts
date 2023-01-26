import { PartialType } from '@nestjs/mapped-types';
import CreateUserProfileDto from './create-user-profile.dto';

const PartialDto = PartialType(CreateUserProfileDto);

export default class UpdateUserProfileDto extends PartialDto {}

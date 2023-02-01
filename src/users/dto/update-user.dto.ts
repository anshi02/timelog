import { OmitType } from '@nestjs/mapped-types';
import CreateUserDto from './create-user.dto';

const PartialDto = OmitType(CreateUserDto, ['email'] as const);

export default class UpdateUserDto extends PartialDto {}

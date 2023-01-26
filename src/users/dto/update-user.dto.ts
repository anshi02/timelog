import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/mapped-types/dist';
import CreateUserDto from './create-user.dto';

const PartialDto = PartialType(OmitType(CreateUserDto, ['email'] as const));

export default class UpdateUserDto extends PartialDto {}

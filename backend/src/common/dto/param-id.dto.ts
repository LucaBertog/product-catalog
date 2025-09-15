import { IsUUID } from 'class-validator';

export class ParamIdDto {
  @IsUUID('4', { message: 'id deve ser um UUID v4 válido' })
  id: string;
}

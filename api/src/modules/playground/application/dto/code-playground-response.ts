import { ApiProperty } from '@nestjs/swagger';

export class CodePlaygroundResponseDto {
  @ApiProperty({ example: 'Hello world' })
  result: string;

  @ApiProperty({ example: 'js' })
  language: string;
}

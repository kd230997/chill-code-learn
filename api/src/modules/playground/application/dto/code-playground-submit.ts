import { ApiProperty } from '@nestjs/swagger';

export class CodePlaygroundSubmitDto {
  @ApiProperty({ example: 'console.log("Hello world")' })
  code: string;

  @ApiProperty({ example: 'js' })
  language: string;
}

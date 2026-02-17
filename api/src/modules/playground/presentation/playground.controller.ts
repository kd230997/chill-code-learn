import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CodePlaygroundSubmitDto } from '../application/dto/code-playground-submit';
import { CodePlaygroundResponseDto } from '../application/dto/code-playground-response';

@ApiTags('Playground')
@ApiBearerAuth()
@Controller('playground')
export class PlaygroundController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Submit code' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Submitted!',
    type: CodePlaygroundSubmitDto,
  })
  async create(
    @Body() dto: CodePlaygroundSubmitDto,
  ): Promise<CodePlaygroundResponseDto> {
    const user = await this.createUser.execute(dto);
    return UserMapper.toResponse(user);
  }
}

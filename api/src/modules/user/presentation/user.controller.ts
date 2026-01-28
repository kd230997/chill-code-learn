import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { FindUsersUseCase } from '../application/use-cases/find-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { UserMapper } from '../application/mappers/user.mappers';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUsers: FindUsersUseCase,
    private readonly findUserById: FindUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUser.execute(dto);
    return UserMapper.toResponse(user);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.findUsers.execute();
    return UserMapper.toResponseList(users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return user details',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.findUserById.execute(id);
    return UserMapper.toResponse(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.updateUser.execute(id, dto);
    return UserMapper.toResponse(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}

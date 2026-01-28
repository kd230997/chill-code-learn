import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'uuid-string', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    nullable: true,
    description: 'User name',
  })
  name: string | null;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  token: string;

  @ApiProperty({ type: AuthUserDto, description: 'User information' })
  user: AuthUserDto;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'uuid-string', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    nullable: true,
    description: 'User name',
  })
  name: string | null;

  @ApiProperty({ description: 'Account creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Account last update timestamp' })
  updatedAt: Date;
}

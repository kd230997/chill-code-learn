import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique user identifier (UUID)' })
    id: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;

    @ApiProperty({ example: 'John Doe', nullable: true, description: 'User display name' })
    name: string | null;

    @ApiProperty({ example: '2026-01-13T10:00:00.000Z', description: 'Account creation timestamp' })
    createdAt: Date;

    @ApiProperty({ example: '2026-01-13T10:00:00.000Z', description: 'Account last update timestamp' })
    updatedAt: Date;
}


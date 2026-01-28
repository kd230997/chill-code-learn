import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
    static toResponse(user: User): UserResponseDto {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static toResponseList(users: User[]): UserResponseDto[] {
        return users.map((item: User) => this.toResponse(item));
    }
}

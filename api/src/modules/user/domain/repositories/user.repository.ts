import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  update(userId: string, dto: UpdateUserDto): Promise<User>;
  delete(userId: string): Promise<void>;
}

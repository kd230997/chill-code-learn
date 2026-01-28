import { User } from '../entities/user.entity';

export interface UserRepository {
    login(email: string, password: string): Promise<User | null>;
    register(email: string, password: string, name?: string): Promise<User | null>;
    getCurrentUser(): Promise<User | null>;
    logout(): Promise<void>;
}

import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

export class AuthUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async login(email: string, password: string): Promise<User | null> {
        return this.userRepository.login(email, password);
    }

    async register(email: string, password: string, name?: string): Promise<User | null> {
        return this.userRepository.register(email, password, name);
    }

    async logout(): Promise<void> {
        return this.userRepository.logout();
    }

    async getCurrentUser(): Promise<User | null> {
        return this.userRepository.getCurrentUser();
    }
}

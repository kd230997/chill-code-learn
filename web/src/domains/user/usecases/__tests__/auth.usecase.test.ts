import { AuthUseCase } from '../auth.usecase';
import { UserRepository } from '../repositories/user.repository';

describe('AuthUseCase', () => {
    let authUseCase: AuthUseCase;
    let mockUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockUserRepository = {
            login: jest.fn(),
            register: jest.fn(),
            logout: jest.fn(),
            getCurrentUser: jest.fn(),
        } as any;

        authUseCase = new AuthUseCase(mockUserRepository);
    });

    it('should call userRepository.login', async () => {
        const mockUser = { id: '1', email: 'test@example.com' };
        mockUserRepository.login.mockResolvedValue(mockUser);

        const result = await authUseCase.login('test@example.com', 'password');

        expect(mockUserRepository.login).toHaveBeenCalledWith('test@example.com', 'password');
        expect(result).toEqual(mockUser);
    });

    it('should call userRepository.register', async () => {
        const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
        mockUserRepository.register.mockResolvedValue(mockUser);

        const result = await authUseCase.register('test@example.com', 'password', 'Test');

        expect(mockUserRepository.register).toHaveBeenCalledWith('test@example.com', 'password', 'Test');
        expect(result).toEqual(mockUser);
    });

    it('should call userRepository.logout', async () => {
        await authUseCase.logout();
        expect(mockUserRepository.logout).toHaveBeenCalledTimes(1);
    });

    it('should call userRepository.getCurrentUser', async () => {
        const mockUser = { id: '1', email: 'test@example.com' };
        mockUserRepository.getCurrentUser.mockResolvedValue(mockUser);

        const result = await authUseCase.getCurrentUser();

        expect(mockUserRepository.getCurrentUser).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUser);
    });
});

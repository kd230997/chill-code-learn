import { AuthUseCase } from "@/domains/user";
import { ApiAuthRepository } from "@/domains/user/repositories/api-auth.repository";

// Repositories
const authRepository = new ApiAuthRepository();

// Use Cases
export const authUseCase = new AuthUseCase(authRepository);

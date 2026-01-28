import { Request } from 'express';
import { User } from '../../modules/user/domain/entities/user.entity';

/**
 * Represents the authenticated user payload attached to the request by JWT authentication.
 * This is a subset of the full User entity, containing only the properties needed for authorization.
 */
export interface AuthenticatedUser {
    id: string;
    email: string;
    name: string | null;
}

/**
 * Extends the Express Request interface to include the authenticated user.
 * Use this interface to type the request parameter in protected controller methods.
 */
export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}

import { AuthResource, Credentials, DomainError } from '@/types';
import { GenericAbortSignal } from 'axios';
import { Result } from 'neverthrow';

/**
 * Service interface for authentication-related operations.
 */
export interface AuthService {
    /**
     * Get a CSRF token with the API.
     */
    csrfCookie: (signal?: GenericAbortSignal) => Promise<Result<null, DomainError>>;
    /**
     * Authenticates a user with the API.
     */
    login: (credentials: Credentials, signal?: GenericAbortSignal) => Promise<Result<AuthResource, DomainError>>;
    /**
     * Destroy a users' session with the API.
     */
    logout: (signal?: GenericAbortSignal) => Promise<Result<null, DomainError>>;
}

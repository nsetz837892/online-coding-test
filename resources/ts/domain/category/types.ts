import { Category, DomainError, Resource } from '@/types';
import { GenericAbortSignal } from 'axios';
import { Result } from 'neverthrow';

/**
 * CategoryService requests the API category endpoints.
 */
export interface CategoryService {
    /**
     * findMany requests in the API for a listing of Category entity.
     */
    findMany: (resource: Resource, signal?: GenericAbortSignal) => Promise<Result<Category[], DomainError>>;
}

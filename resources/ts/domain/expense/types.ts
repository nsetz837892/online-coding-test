import { ApiPaginated, Deleted, DomainError, Expense, Resource, Summary } from '@/types';
import { GenericAbortSignal } from 'axios';
import { Result } from 'neverthrow';

export type Payload = {
    amount: number;
    categoryId: number;
    date: string;
    description: string | null | undefined;
};

/**
 * Represents a service interface for managing Expense entities, providing methods
 * to interact with an API for various operations including pagination, summary retrieval,
 * creation, and deletion of expenses.
 */
export interface ExpenseService {
    /**
     * paginate requests the API for a paginated listing of Expanse entity.
     */
    paginate: (resource: Resource, signal?: GenericAbortSignal) => Promise<Result<ApiPaginated<Expense>, DomainError>>;
    /**
     * summary requests the API for an expanse summary.
     */
    summary: (signal?: GenericAbortSignal) => Promise<Result<Summary, DomainError>>;
    /**
     * create requests the API to create an expanse entity.
     */
    create: (payload: Payload, signal?: GenericAbortSignal) => Promise<Result<Expense, DomainError>>;
    /**
     * deleteOne requests the API to deleter an expanse entity.
     */
    deleteOne: (id: number, signal?: GenericAbortSignal) => Promise<Result<Deleted, DomainError>>;
}

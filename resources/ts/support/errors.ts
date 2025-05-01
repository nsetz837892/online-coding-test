import { DomainError } from '@/types';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

/**
 * parseApiError is a handler to NeverThrow error.
 */
export const parseApiError = (cause: unknown): DomainError => {
    return {
        message:
            cause instanceof AxiosError
                ? cause?.response?.data.message
                : cause instanceof ZodError
                    ? cause.errors[0].message
                    : cause instanceof Error
                        ? cause.message
                        : String(cause),
        status: cause instanceof AxiosError
            ? cause.status
            : 400,
        type: cause instanceof AxiosError
            ? cause?.response?.data.type
            : 'API_ERROR'
    };
};

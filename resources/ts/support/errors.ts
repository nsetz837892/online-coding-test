import { DomainError } from '@/types';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

/**
 * Parses an error object and maps it to a `DomainError` type.
 *
 * This function analyses the provided `cause` and extracts a standardised error format
 * based on its type. It supports multiple error types, including `AxiosError`, `ZodError`,
 * and generic `Error` objects. If the cause does not match any of these, it attempts
 * to convert it to a string.
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

import { DataError } from '@/constants/data';
import { createPaginatedResponseSchema } from '@/domain/app/schema';
import {
    Expense as ExpenseSchema,
    Expenses as ExpensesSchema,
    ExpenseSummary as ExpenseSummarySchema
} from '@/domain/expense/schema';
import { ExpenseService, Payload } from '@/domain/expense/types';
import { serviceHelper } from '@/domain/service-helper';
import { parseApiError } from '@/support/errors';
import { Api, ApiPaginated, Deleted, DomainError, Expense, Resource, Summary, ZodSafeResults } from '@/types';
import axios, { AxiosResponse, GenericAbortSignal } from 'axios';
import { err, ok, Result, ResultAsync } from 'neverthrow';

/**
 * Represents the expense service that provides methods for managing expenses, including fetching, creating, and
 * deleting expenses.
 */
export const expenseService: ExpenseService = {
    paginate: async (resource: Resource, signal?: GenericAbortSignal): Promise<Result<ApiPaginated<Expense>, DomainError>> => {
        const asyncRes: Result<ApiPaginated<Expense>, DomainError> = await ResultAsync.fromPromise(
            axios.
                get(
                    serviceHelper.getQueryPath(
                        'authenticated.expense.many',
                        resource
                    ),
                    { signal }
                ).
                then((response: AxiosResponse<ApiPaginated<Expense>>): ApiPaginated<Expense> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'EXPENSE_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'EXPENSE_UNSUCCESSFUL'
            });
        }

        const apiPaginatedType = createPaginatedResponseSchema<typeof ExpensesSchema>(ExpensesSchema);

        const transformRes: Result<ZodSafeResults<ApiPaginated<Expense>>, DomainError> = await ResultAsync.fromPromise(
            apiPaginatedType.safeParseAsync(asyncRes.value),
            parseApiError
        ).andThen(result => result?.error
            ? err({
                message: `Data Error ${DataError.EXPENSE}`,
                type: 'EXPENSE_DATA_FAILED'
            })
            : ok(result));

        if (transformRes.isErr()) {
            return err(transformRes.error);
        }

        return ok(transformRes.value.data as ApiPaginated<Expense>);
    },
    summary: async (signal?: GenericAbortSignal): Promise<Result<Summary, DomainError>> => {
        const asyncRes: Result<ApiPaginated<Summary>, DomainError> = await ResultAsync.fromPromise(
            axios.
                get(
                    serviceHelper.getPath('authenticated.expense.summary'),
                    { signal }
                ).
                then((response: AxiosResponse<ApiPaginated<Summary>>): ApiPaginated<Summary> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'EXPENSE_SUMMARY_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'EXPENSE_SUMMARY_UNSUCCESSFUL'
            });
        }

        const transformRes: Result<ZodSafeResults<Summary>, DomainError> = await ResultAsync.fromPromise(
            ExpenseSummarySchema.safeParseAsync(asyncRes.value.data),
            parseApiError
        ).andThen(result => result?.error
            ? err({
                message: `Data Error ${DataError.EXPENSE_SUMMARY}`,
                type: 'EXPENSE_SUMMARY_DATA_FAILED'
            })
            : ok(result));

        if (transformRes.isErr()) {
            return err(transformRes.error);
        }

        return ok(transformRes.value.data as Summary);
    },
    create: async (payload: Payload, signal?: GenericAbortSignal): Promise<Result<Expense, DomainError>> => {
        const asyncRes: Result<Api<Expense>, DomainError> = await ResultAsync.fromPromise(
            axios.
                post(
                    serviceHelper.getPath('authenticated.expense.add'),
                    { ...payload },
                    { signal }
                ).
                then((response: AxiosResponse<Api<Expense>>): Api<Expense> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'EXPENSE_ADD_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'EXPENSE_ADD_UNSUCCESSFUL'
            });
        }

        const transformRes: Result<ZodSafeResults<Expense>, DomainError> = await ResultAsync.fromPromise(
            ExpenseSchema.safeParseAsync(asyncRes.value.data),
            parseApiError
        ).andThen(result => result?.error
            ? err({
                message: `Data Error ${DataError.EXPENSE}`,
                type: 'EXPENSE_ADD_DATA_FAILED'
            })
            : ok(result));

        if (transformRes.isErr()) {
            return err(transformRes.error);
        }

        return ok(transformRes.value.data as Expense);
    },
    deleteOne: async (id: number, signal?: GenericAbortSignal): Promise<Result<Deleted, DomainError>> => {
        const asyncRes: Result<Api<Deleted>, DomainError> = await ResultAsync.fromPromise(
            axios.
                delete(
                    serviceHelper.getParameterPath(
                        'authenticated.expense.delete',
                        { id }
                    ),
                    { signal }
                ).
                then((response: AxiosResponse<Api<Deleted>>): Api<Deleted> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'EXPENSE_DELETE_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'EXPENSE_DELETE_UNSUCCESSFUL'
            });
        }

        return ok(asyncRes.value.data as Deleted);
    }
};

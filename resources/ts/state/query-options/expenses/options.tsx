import { ApiPaginatedDto } from '@/domain/app/dto';
import { expenseService } from '@/domain/expense';
import { ExpenseSummaryDto } from '@/domain/expense/dto';
import { getExpenseQueryKey, getExpenseSummaryQueryKey } from '@/state/query-keys/expense/keys';
import { ApiPaginated, DomainError, Expense, Resource, Summary } from '@/types';
import { keepPreviousData, queryOptions, UndefinedInitialDataOptions } from '@tanstack/react-query';
import { Result } from 'neverthrow';

type QueryKeyTuple = [
    string,
    {
        resource: Resource;
        userId: number;
    }
];

/**
 * Options for querying paginated expense data.
 */
export const expenseQueryOptions = (
    userId: number,
    page?: number,
    perPage?: number,
    category?: number
): UndefinedInitialDataOptions<ApiPaginated<Expense>> => queryOptions<ApiPaginated<Expense>>({
    queryKey: getExpenseQueryKey(
        userId,
        {
            paginate: true,
            page,
            perPage,
            categoryId: category
        }
    ),
    queryFn: async ({ queryKey, signal }): Promise<ApiPaginated<Expense>> => {
        const [, { resource }] = queryKey as QueryKeyTuple;

        const result: Result<ApiPaginated<Expense>, DomainError> = await expenseService.paginate(
            resource,
            signal
        );

        return result.isErr()
            ? { ...ApiPaginatedDto }
            : result.value;
    },
    enabled: !!userId,
    placeholderData: keepPreviousData
});

/**
 * Generates query options for retrieving an expense summary based on the provided user ID.
 */
export const expenseSummaryQueryOptions = (userId: number): UndefinedInitialDataOptions<Summary> => queryOptions<Summary>({
    queryKey: getExpenseSummaryQueryKey(userId),
    queryFn: async ({ signal }): Promise<Summary> => {
        const result: Result<Summary, DomainError> = await expenseService.summary(signal);

        return result.isErr()
            ? { ...ExpenseSummaryDto }
            : result.value;
    },
    enabled: !!userId
});

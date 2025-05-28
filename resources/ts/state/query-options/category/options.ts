import { categoryService } from '@/domain/category';
import getCategoryQueryKey from '@/state/query-keys/category/keys';
import { Category, DomainError, Resource } from '@/types';
import { keepPreviousData, queryOptions, UndefinedInitialDataOptions } from '@tanstack/react-query';
import { Result } from 'neverthrow';

type QueryKeyTuple = [
    string,
    {
        resource: Resource;
    }
];

/**
 * categoryQueryOptions generates query options for fetching categories based on a specified resource.
 */
export const categoryQueryOptions = (resource: Resource): UndefinedInitialDataOptions<Category[]> => queryOptions<Category[]>({
    queryKey: getCategoryQueryKey(resource),
    queryFn: async ({ queryKey, signal }): Promise<Category[]> => {
        const [, { resource }] = queryKey as QueryKeyTuple;

        const result: Result<Category[], DomainError> = await categoryService.findMany(
            resource,
            signal
        );

        if (result.isErr()) {
            return [];
        }

        return result.value;
    },
    placeholderData: keepPreviousData
});

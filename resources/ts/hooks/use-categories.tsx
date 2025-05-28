import { categoryQueryOptions } from '@/state/query-options/category/options';
import { Category } from '@/types';
import { useQuery } from '@tanstack/react-query';

/**
 * Retrieves a list of category entities using Tanstack Query.
 *
 * This function fetches category data with pagination disabled. If no data is available,
 * it returns an empty array.
 *
 * @return {Category[]} An array of category entities, or an empty array if no data is available.
 */
export function useCategories (): Category[] {
    /**
     * Tanstack query client -- get a listing of category entity.
     */
    const { data } = useQuery(categoryQueryOptions({ paginate: false }));

    return data ?? [];
}

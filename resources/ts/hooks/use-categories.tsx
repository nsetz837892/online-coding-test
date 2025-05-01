import { categoryQueryOptions } from '@/state/query-options/category/options';
import { Category } from '@/types';
import { useQuery } from '@tanstack/react-query';

/**
 * useCategories returns a listing of Category entity.
 */
export function useCategories (): Category[] {
    /**
     * Tanstack query client -- get a listing of category entity.
     */
    const { data } = useQuery(categoryQueryOptions({ paginate: false }));

    return data ?? [];
}

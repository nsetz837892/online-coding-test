import { QueryKeys } from '@/constants/keys';
import { Resource } from '@/types';

export function getExpenseQueryKey (userId: number, resource: Resource) {
    return [
        QueryKeys.EXPENSES,
        {
            userId,
            resource
        }
    ] as const;
}

export function getExpenseSummaryQueryKey (userId: number) {
    return [
        QueryKeys.EXPENSES,
        QueryKeys.SUMMARY,
        {
            userId
        }
    ] as const;
}

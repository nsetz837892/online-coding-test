import { QueryKeys } from '@/constants/keys';
import { Resource } from '@/types';

export default function getCategoryQueryKey (resource: Resource) {
    return [QueryKeys.CATEGORY, { resource }] as const;
}

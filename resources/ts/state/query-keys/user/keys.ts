import { QueryKeys } from '@/constants/keys';

export default function getUserQueryKey () {
    return [QueryKeys.USER, QueryKeys.CURRENT] as const;
}

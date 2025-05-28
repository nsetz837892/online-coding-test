import { QueryKeys } from '@/constants/keys';

export default function getAuthQueryKey () {
    return [QueryKeys.AUTH] as const;
}
